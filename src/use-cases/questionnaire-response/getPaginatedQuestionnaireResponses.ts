/* eslint-disable max-len */
import {
  Equal,
  Between,
  FindOperator,
  MoreThanOrEqual,
  LessThanOrEqual,
  getCustomRepository,
} from 'typeorm';
import { pickBy } from 'lodash';
import { Nullable } from '@/helper-types';
import { convertGqlOrderByClausesToORM } from '@/services/OrderByService';
import Paginatable from '@/graphql/types/args/query/reusable/paginatable/Paginatable';
import OrderByClause from '@/graphql/types/args/query/reusable/orderable/OrderByClause';
import QuestionnaireResponseFields from '@/interfaces/QuestionnaireResponseFields';
import { convertGqlPaginationToORM, convertToPaginatedResponse } from '@/services/PaginationService';
import QuestionnaireResponsesArgs from '@/graphql/types/args/query/questionnaire-response/QuestionnaireResponsesArgs';
import PaginatedQuestionnaireResponses from '@/graphql/types/responses/questionnaire-response/PaginatedQuestionnaireResponses';
import QuestionnaireResponseRepository, { GetQuestionnaireResponsesArgs } from '@/repositories/QuestionnaireResponseRepository';

type Args = {
  pagination: Paginatable;
  orderBy: OrderByClause<QuestionnaireResponseFields>[];
  where: Pick<QuestionnaireResponsesArgs, 'userId' | 'responseDateAfter' | 'responseDateBefore' | 'withDeleted'>;
};

function getResponseDateWhereClause(after?: Date, before?: Date): Nullable<FindOperator<Date>> {
  if (after && before) return Between(after, before);
  if (after) return MoreThanOrEqual(after);
  if (before) return LessThanOrEqual(before);
  return undefined;
}

function convertGqlWhereClauseToORM(where: Args['where']): GetQuestionnaireResponsesArgs['where'] {
  const { userId, responseDateAfter, responseDateBefore } = where;
  const patient = userId ? Equal(userId) : undefined;
  const responseDate = getResponseDateWhereClause(responseDateAfter, responseDateBefore);

  return pickBy({ patient, responseDate }, Boolean);
}

export default async function (args: Args): Promise<PaginatedQuestionnaireResponses> {
  const { withDeleted } = args.where;
  const where = convertGqlWhereClauseToORM(args.where);
  const pagination = convertGqlPaginationToORM(args.pagination);
  const orderBy = convertGqlOrderByClausesToORM(args.orderBy);
  const questionnaireRepository = getCustomRepository(QuestionnaireResponseRepository);

  const [results, totalResultsCount] = await questionnaireRepository.findAndCountQuestionnaireResponses({
    pagination, where, withDeleted, orderBy,
  });

  const { pageNumber, resultsPerPage } = args.pagination;
  const response = convertToPaginatedResponse({
    totalResultsCount,
    resultsPerPage,
    pageNumber,
    results,
  });

  return response;
}
