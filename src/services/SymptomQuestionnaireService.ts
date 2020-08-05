/* eslint-disable no-param-reassign */
import { isEmpty } from 'lodash';
import { getConnection, ObjectLiteral, OrderByCondition } from 'typeorm';
import { NullablePromise } from '@/helper-types';
import { ORMPagination } from '@/services/PaginationService';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { applyPrefixToOrderByCondition } from '@/services/OrderByService';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';
import SymptomQuestionnaireQuestionChoice from '@/entities/SymptomQuestionnaireQuestionChoice';

export type GetSymptomQuestionnairesArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  currentVersionsOnly?: boolean;
  orderBy?: OrderByCondition;
  where?: ObjectLiteral;
};

export async function findAndCountSymptomQuestionnaires(args: GetSymptomQuestionnairesArgs): Promise<[SymptomQuestionnaire[], number]> {
  const {
    where,
    orderBy,
    pagination,
    withDeleted,
    currentVersionsOnly,
  } = args;

  let query = getConnection()
    .createQueryBuilder(SymptomQuestionnaire, 'q')
    .leftJoinAndSelect('q.questions', 'questions')
    .leftJoinAndSelect('questions.possibleChoices', 'possibleChoices');

  if (currentVersionsOnly) {
    query = query.innerJoin(
      (qb) => qb
        .from(SymptomQuestionnaire, 'q2')
        .select(['id', 'MAX(version) as version'])
        .groupBy('id'),
      'current',
      'current.id = q.id AND current.version = q.version',
    );
  }
  if (pagination?.skip) query = query.skip(pagination?.skip);
  if (pagination?.take) query = query.take(pagination?.take);
  if (withDeleted) query = query.withDeleted();
  if (orderBy) query = query.orderBy(applyPrefixToOrderByCondition(orderBy, 'q.'));
  if (where) query = query.where(where);

  const [results, count] = await query.getManyAndCount();
  return [results, count];
}

export async function getHighestVersionNumber(id: string): NullablePromise<number> {
  const { max } = await getConnection()
    .createQueryBuilder(SymptomQuestionnaire, 'q')
    .select('MAX(q.version)', 'max')
    .where('q.id = :id', { id })
    .getRawOne();

  return max || undefined;
}

export async function findQuestionnaireWithHighestVersion(id: string, withDeleted = false) {
  return SymptomQuestionnaire.findOne({ where: { id }, order: { version: 'DESC' }, withDeleted });
}

export async function findQuestionnaireByIdAndVersion(id: string, version: number): NullablePromise<SymptomQuestionnaire> {
  return SymptomQuestionnaire.findOne({ where: { id, version } });
}

async function createChoice(choice: SymptomQuestionnaireQuestionChoice, question: SymptomQuestionnaireQuestion) {
  choice.question = question;
  await choice.save();
}

async function createQuestion(question: SymptomQuestionnaireQuestion, questionnaire: SymptomQuestionnaire) {
  question.questionnaire = questionnaire;
  await question.save();

  const questionHasNoChoices = isEmpty(question.possibleChoices);
  if (questionHasNoChoices) return;

  await Promise.all((question.possibleChoices || []).map((choice) => createChoice(choice, question)));
}

export async function createQuestionnaireWithQuestionsAndChoices(questionnaire: SymptomQuestionnaire): Promise<void> {
  await questionnaire.save();
  await Promise.all(questionnaire.questions.map((question) => createQuestion(question, questionnaire)));
}

export async function updateQuestionnairePublishStatus(questionnaire: SymptomQuestionnaire, isPublished: boolean) {
  questionnaire.isPublished = isPublished;
  return questionnaire.save();
}

export async function softRemoveQuestionnaires(questionnaires: SymptomQuestionnaire[]) {
  return SymptomQuestionnaire.getRepository().softRemove(questionnaires);
}

export async function recoverQuestionnaires(questionnaires: SymptomQuestionnaire[]) {
  return SymptomQuestionnaire.getRepository().recover(questionnaires);
}
