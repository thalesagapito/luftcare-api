/* eslint-disable no-param-reassign */
import { isEmpty } from 'lodash';
import {
  getManager,
  Repository,
  getConnection,
  EntityManager,
  ObjectLiteral,
  EntityRepository,
  OrderByCondition,
} from 'typeorm';
import { NullablePromise } from '@/helper-types';
import { ORMPagination } from '@/services/PaginationService';
import Questionnaire from '@/entities/Questionnaire';
import { applyPrefixToOrderByCondition } from '@/services/OrderByService';
import QuestionnaireQuestion from '@/entities/QuestionnaireQuestion';
import QuestionnaireScoreRange from '@/entities/QuestionnaireScoreRange';
import QuestionnaireQuestionChoice from '@/entities/QuestionnaireQuestionChoice';

export type GetQuestionnairesArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  currentVersionsOnly?: boolean;
  orderBy?: OrderByCondition;
  where?: ObjectLiteral;
};

@EntityRepository(Questionnaire)
export default class QuestionnaireRepository extends Repository<Questionnaire> {
  public async findAndCountQuestionnaires(args: GetQuestionnairesArgs): Promise<[Questionnaire[], number]> {
    const {
      where,
      orderBy,
      pagination,
      withDeleted,
      currentVersionsOnly,
    } = args;

    let query = getConnection()
      .createQueryBuilder(Questionnaire, 'q')
      .leftJoinAndSelect('q.questions', 'questions')
      .leftJoinAndSelect('questions.possibleChoices', 'possibleChoices')
      .leftJoinAndSelect('q.scoreRanges', 'scoreRanges');

    if (currentVersionsOnly) {
      query = query.innerJoin(
        (qb) => qb
          .from(Questionnaire, 'q2')
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

  public async getHighestVersionNumber(id: string): NullablePromise<number> {
    const { max } = await getConnection()
      .createQueryBuilder(Questionnaire, 'q')
      .select('MAX(q.version)', 'max')
      .where('q.id = :id', { id })
      .getRawOne();

    return max || undefined;
  }

  public async findQuestionnaireWithHighestVersion(id: string, withDeleted = false) {
    let query = getConnection()
      .createQueryBuilder(Questionnaire, 'q')
      .addOrderBy('q.version', 'DESC')
      .leftJoinAndSelect('q.questions', 'questions')
      .addOrderBy('questions.presentationOrder', 'ASC')
      .leftJoinAndSelect('questions.possibleChoices', 'possibleChoices')
      .addOrderBy('possibleChoices.presentationOrder', 'ASC')
      .leftJoinAndSelect('q.scoreRanges', 'scoreRanges')
      .addOrderBy('scoreRanges.minScore', 'ASC')
      .where({ id });

    if (withDeleted) query = query.withDeleted();

    return query.getOne();
  }

  public async findQuestionnaireByIdAndVersion(id: string, version: number): NullablePromise<Questionnaire> {
    return this.findOne({ where: { id, version } });
  }

  private async createChoice(choice: QuestionnaireQuestionChoice, question: QuestionnaireQuestion, entityManager: EntityManager) {
    choice.question = question;
    return entityManager.save(choice);
  }

  private async createQuestion(question: QuestionnaireQuestion, questionnaire: Questionnaire, entityManager: EntityManager) {
    question.questionnaire = questionnaire;
    await entityManager.save(question);

    const questionHasNoChoices = isEmpty(question.possibleChoices);
    if (questionHasNoChoices) return;

    const choiceCreationPromises = (question.possibleChoices || [])
      .map((choice) => this.createChoice(choice, question, entityManager));

    await Promise.all(choiceCreationPromises);
  }

  private async createScoreRange(scoreRange: QuestionnaireScoreRange, questionnaire: Questionnaire, entityManager: EntityManager) {
    scoreRange.questionnaire = questionnaire;
    await entityManager.save(scoreRange);
  }

  public async createQuestionnaireWithChildEntities(questionnaire: Questionnaire): Promise<void> {
    // runs questionnaire and child entities creation in the same transaction,
    // so if any of operations fail all of them get rolled back
    return getManager().transaction(async (entityManager) => {
      await entityManager.save(questionnaire);

      const questionCreationPromises = questionnaire.questions
        .map((question) => this.createQuestion(question, questionnaire, entityManager));

      const scoreRangeCreationPromises = questionnaire.scoreRanges
        .map((scoreRange) => this.createScoreRange(scoreRange, questionnaire, entityManager));

      await Promise.all([
        ...questionCreationPromises,
        ...scoreRangeCreationPromises,
      ]);
    });
  }

  public async updateQuestionnairePublishStatus(questionnaire: Questionnaire, isPublished: boolean) {
    questionnaire.isPublished = isPublished;
    return questionnaire.save();
  }

  public async softRemoveQuestionnaires(questionnaires: Questionnaire[]) {
    return this.softRemove(questionnaires);
  }

  public async recoverQuestionnaires(questionnaires: Questionnaire[]) {
    return this.recover(questionnaires);
  }
}
