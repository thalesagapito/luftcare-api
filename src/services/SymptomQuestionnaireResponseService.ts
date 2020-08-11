/* eslint-disable no-param-reassign */
import {
  getConnection, ObjectLiteral, OrderByCondition, getManager,
} from 'typeorm';
import { NullablePromise } from '@/helper-types';
import { ORMPagination } from '@/services/PaginationService';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { applyPrefixToOrderByCondition } from '@/services/OrderByService';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import SymptomQuestionnaireResponseAnswer from '@/entities/SymptomQuestionnaireResponseAnswer';

export type GetSymptomQuestionnaireResponsesArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  orderBy?: OrderByCondition;
  where?: ObjectLiteral;
};

export async function findAndCountSymptomQuestionnaireResponses(args: GetSymptomQuestionnaireResponsesArgs): Promise<[SymptomQuestionnaireResponse[], number]> {
  const {
    where,
    orderBy,
    pagination,
    withDeleted,
  } = args;

  let query = getConnection()
    .createQueryBuilder(SymptomQuestionnaireResponse, 'r')
    .leftJoinAndSelect('r.patient', 'patient')
    .leftJoinAndSelect('r.questionnaire', 'questionnaire')
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

export async function findSymptomQuestionnaireByIdAndVersion(id: string, version: number): NullablePromise<SymptomQuestionnaire> {
  return SymptomQuestionnaire.findOne({ where: { id, version } });
}

export async function softRemoveQuestionnaireResponse(response: SymptomQuestionnaireResponse) {
  return SymptomQuestionnaireResponse.getRepository().softRemove(response);
}

export async function recoverQuestionnaireResponse(response: SymptomQuestionnaireResponse) {
  return SymptomQuestionnaireResponse.getRepository().recover(response);
}

export async function createResponseWithAnswers(questionnaireResponse: SymptomQuestionnaireResponse, questionAnswers: SymptomQuestionnaireResponseAnswer[]) {
  // runs response and answers creation in the same transaction,
  // so if one of them fails both of them get rolled back
  return getManager().transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.save(questionnaireResponse);
    await transactionalEntityManager.save(questionAnswers);
  });
}
