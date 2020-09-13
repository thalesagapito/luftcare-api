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
import SymptomQuestionnaireResponseFields from '@/interfaces/SymptomQuestionnaireResponseFields';
import { convertGqlPaginationToORM, convertToPaginatedResponse } from '@/services/PaginationService';
import SymptomQuestionnaireResponsesArgs from '@/graphql/types/args/query/symptom-questionnaire-response/SymptomQuestionnaireResponsesArgs';
import PaginatedSymptomQuestionnaireResponses from '@/graphql/types/responses/symptom-questionnaire-response/PaginatedSymptomQuestionnaireResponses';
import SymptomQuestionnaireResponseRepository, { GetSymptomQuestionnaireResponsesArgs } from '@/repositories/SymptomQuestionnaireResponseRepository';

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
  const { patientId, responseDateAfter, responseDateBefore } = where;
  const patient = patientId ? Equal(patientId) : undefined;
  const responseDate = getResponseDateWhereClause(responseDateAfter, responseDateBefore);

  return pickBy({ patient, responseDate }, Boolean);
}

export default async function (args: Args): Promise<PaginatedSymptomQuestionnaireResponses> {
  const { withDeleted } = args.where;
  const where = convertGqlWhereClauseToORM(args.where);
  const pagination = convertGqlPaginationToORM(args.pagination);
  const orderBy = convertGqlOrderByClausesToORM(args.orderBy);
  const questionnaireRepository = getCustomRepository(SymptomQuestionnaireResponseRepository);

  const [results, totalResultsCount] = await questionnaireRepository.findAndCountSymptomQuestionnaireResponses({
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
