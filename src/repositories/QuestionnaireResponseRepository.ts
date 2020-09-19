/* eslint-disable no-param-reassign */
import {
  getManager,
  Repository,
  ObjectLiteral,
  OrderByCondition,
  EntityRepository,
} from 'typeorm';
import { NullablePromise } from '@/helper-types';
import { ORMPagination } from '@/services/PaginationService';
import Questionnaire from '@/entities/Questionnaire';
import { applyPrefixToOrderByCondition } from '@/services/OrderByService';
import QuestionnaireResponse from '@/entities/QuestionnaireResponse';
import QuestionnaireResponseAnswer from '@/entities/QuestionnaireResponseAnswer';
import calculateResponseScore from '@/use-cases/questionnaire-response/calculateResponseScore';

export type GetQuestionnaireResponsesArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  orderBy?: OrderByCondition;
  where?: ObjectLiteral;
};

@EntityRepository(QuestionnaireResponse)
export default class QuestionnaireResponseRepository extends Repository<QuestionnaireResponse> {
  public async findAndCountQuestionnaireResponses(args: GetQuestionnaireResponsesArgs): Promise<[QuestionnaireResponse[], number]> {
    const {
      where,
      orderBy,
      pagination,
      withDeleted,
    } = args;

    let query = this
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.patient', 'patient')
      .leftJoinAndSelect('r.questionnaire', 'questionnaire')
      .leftJoinAndSelect('questionnaire.scoreRanges', 'scoreRanges')
      .leftJoinAndSelect('r.questionAnswers', 'questionAnswers')
      .leftJoinAndSelect('questionAnswers.selectedChoice', 'selectedChoice')
      .leftJoinAndSelect('questionAnswers.question', 'question')
      .leftJoinAndSelect('question.possibleChoices', 'possibleChoices');

    if (pagination?.skip) query = query.skip(pagination?.skip);
    if (pagination?.take) query = query.take(pagination?.take);
    if (withDeleted) query = query.withDeleted();
    if (orderBy) query = query.orderBy(applyPrefixToOrderByCondition(orderBy, 'r.'));
    if (where) query = query.where(where);

    const [results, count] = await query.getManyAndCount();
    return [results, count];
  }

  public async findQuestionnaireByIdAndVersion(id: string, version: number): NullablePromise<Questionnaire> {
    return Questionnaire.findOne({ where: { id, version } });
  }

  public async softRemoveQuestionnaireResponse(response: QuestionnaireResponse) {
    return this.softRemove(response);
  }

  public async recoverQuestionnaireResponse(response: QuestionnaireResponse) {
    return this.recover(response);
  }

  public async createResponseWithAnswers(
    questionnaireResponse: QuestionnaireResponse,
    questionAnswers: QuestionnaireResponseAnswer[],
  ): Promise<QuestionnaireResponse> {
    // runs response and answers creation in the same transaction,
    // so if one of them fails both of them get rolled back
    return getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(questionnaireResponse);
      await transactionalEntityManager.save(questionAnswers);
    }).then(() => {
      questionnaireResponse.score = calculateResponseScore(questionnaireResponse);
      return questionnaireResponse;
    });
  }
}
