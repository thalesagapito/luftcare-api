/* eslint-disable no-param-reassign */
import { isEmpty } from 'lodash';
import {
  getManager,
  getConnection,
  EntityManager,
  ObjectLiteral,
  OrderByCondition,
} from 'typeorm';
import { NullablePromise } from '@/helper-types';
import { ORMPagination } from '@/services/PaginationService';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { applyPrefixToOrderByCondition } from '@/services/OrderByService';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';
import SymptomQuestionnaireScoreRange from '@/entities/SymptomQuestionnaireScoreRange';
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
    .leftJoinAndSelect('questions.possibleChoices', 'possibleChoices')
    .leftJoinAndSelect('q.scoreRanges', 'scoreRanges');

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
  let query = getConnection()
    .createQueryBuilder(SymptomQuestionnaire, 'q')
    .addOrderBy('q.version', 'DESC')
    .leftJoinAndSelect('q.questions', 'questions')
    .addOrderBy('questions.presentationOrder', 'ASC')
    .leftJoinAndSelect('questions.possibleChoices', 'possibleChoices')
    .addOrderBy('possibleChoices.presentationOrder', 'ASC')
    .where({ id });

  if (withDeleted) query = query.withDeleted();

  return query.getOne();
}

export async function findSymptomQuestionnaireByIdAndVersion(id: string, version: number): NullablePromise<SymptomQuestionnaire> {
  return SymptomQuestionnaire.findOne({ where: { id, version } });
}

async function createChoice(choice: SymptomQuestionnaireQuestionChoice, question: SymptomQuestionnaireQuestion, entityManager: EntityManager) {
  choice.question = question;
  return entityManager.save(choice);
}

async function createQuestion(question: SymptomQuestionnaireQuestion, questionnaire: SymptomQuestionnaire, entityManager: EntityManager) {
  question.questionnaire = questionnaire;
  await entityManager.save(question);

  const questionHasNoChoices = isEmpty(question.possibleChoices);
  if (questionHasNoChoices) return;

  const choiceCreationPromises = (question.possibleChoices || [])
    .map((choice) => createChoice(choice, question, entityManager));

  await Promise.all(choiceCreationPromises);
}

async function createScoreRange(scoreRange: SymptomQuestionnaireScoreRange, questionnaire: SymptomQuestionnaire, entityManager: EntityManager) {
  scoreRange.questionnaire = questionnaire;
  await entityManager.save(scoreRange);
}

export async function createQuestionnaireWithChildEntities(questionnaire: SymptomQuestionnaire): Promise<void> {
  // runs questionnaire and child entities creation in the same transaction,
  // so if any of operations fail all of them get rolled back
  return getManager().transaction(async (entityManager) => {
    await entityManager.save(questionnaire);

    const questionCreationPromises = questionnaire.questions
      .map((question) => createQuestion(question, questionnaire, entityManager));

    const scoreRangeCreationPromises = questionnaire.scoreRanges
      .map((scoreRange) => createScoreRange(scoreRange, questionnaire, entityManager));

    await Promise.all([
      ...questionCreationPromises,
      ...scoreRangeCreationPromises,
    ]);
  });
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
