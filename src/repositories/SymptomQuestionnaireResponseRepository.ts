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
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { applyPrefixToOrderByCondition } from '@/services/OrderByService';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import SymptomQuestionnaireResponseAnswer from '@/entities/SymptomQuestionnaireResponseAnswer';
import calculateResponseScore from '@/use-cases/symptom-questionnaire-response/calculateResponseScore';

export type GetSymptomQuestionnaireResponsesArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  orderBy?: OrderByCondition;
  where?: ObjectLiteral;
};

@EntityRepository(SymptomQuestionnaireResponse)
export default class SymptomQuestionnaireResponseRepository extends Repository<SymptomQuestionnaireResponse> {
  public async findAndCountSymptomQuestionnaireResponses(args: GetSymptomQuestionnaireResponsesArgs): Promise<[SymptomQuestionnaireResponse[], number]> {
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

  public async findSymptomQuestionnaireByIdAndVersion(id: string, version: number): NullablePromise<SymptomQuestionnaire> {
    return SymptomQuestionnaire.findOne({ where: { id, version } });
  }

  public async softRemoveQuestionnaireResponse(response: SymptomQuestionnaireResponse) {
    return this.softRemove(response);
  }

  public async recoverQuestionnaireResponse(response: SymptomQuestionnaireResponse) {
    return this.recover(response);
  }

  public async createResponseWithAnswers(
    questionnaireResponse: SymptomQuestionnaireResponse,
    questionAnswers: SymptomQuestionnaireResponseAnswer[],
  ): Promise<SymptomQuestionnaireResponse> {
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
