/* eslint-disable max-len */
import {
  Equal,
  Between,
  FindOperator,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { pickBy } from 'lodash';
import { convertGqlOrderByClausesToORM } from '@/services/OrderByService';
import SymptomQuestionnaireResponseFields from '@/interfaces/SymptomQuestionnaireResponseFields';
import Paginatable from '@/graphql/types/args/query/reusable/paginatable/Paginatable';
import OrderByClause from '@/graphql/types/args/query/reusable/orderable/OrderByClause';
import { convertGqlPaginationToORM, convertToPaginatedResponse } from '@/services/PaginationService';
import SymptomQuestionnaireResponsesArgs from '@/graphql/types/args/query/symptom-questionnaire-response/SymptomQuestionnaireResponsesArgs';
import { GetSymptomQuestionnaireResponsesArgs, findAndCountSymptomQuestionnaireResponses } from '@/services/SymptomQuestionnaireResponseService';
import PaginatedSymptomQuestionnaireResponses from '@/graphql/types/responses/symptom-questionnaire-response/PaginatedSymptomQuestionnaireResponses';
import { Nullable } from '@/helper-types';

type Args = {
  pagination: Paginatable;
  orderBy: OrderByClause<SymptomQuestionnaireResponseFields>[];
  where: Pick<SymptomQuestionnaireResponsesArgs, 'patientId' | 'responseDateAfter' | 'responseDateBefore' | 'withDeleted'>;
};

function getResponseDateWhereClause(after?: Date, before?: Date): Nullable<FindOperator<Date>> {
  if (after && before) return Between(after, before);
  if (after) return MoreThanOrEqual(after);
  if (before) return LessThanOrEqual(before);
  return undefined;
}

function convertGqlWhereClauseToORM(where: Args['where']): GetSymptomQuestionnaireResponsesArgs['where'] {
  const { responseDateAfter, responseDateBefore } = where;
  const patientId = where.patientId ? Equal(where.patientId) : undefined;
  const responseDate = getResponseDateWhereClause(responseDateAfter, responseDateBefore);

  return pickBy({ patientId, responseDate }, Boolean);
}

export default async function (args: Args): Promise<PaginatedSymptomQuestionnaireResponses> {
  const { withDeleted } = args.where;
  const where = convertGqlWhereClauseToORM(args.where);
  const pagination = convertGqlPaginationToORM(args.pagination);
  const orderBy = convertGqlOrderByClausesToORM(args.orderBy);

  const [results, totalResultsCount] = await findAndCountSymptomQuestionnaireResponses({
    pagination, where, withDeleted, orderBy,
  });

  const { pageNumber, resultsPerPage } = args.pagination;
  const response = convertToPaginatedResponse({
    pageNumber, resultsPerPage, totalResultsCount, results,
  });

  return response;
}
