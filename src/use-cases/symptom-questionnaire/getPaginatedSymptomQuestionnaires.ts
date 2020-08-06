import { Like } from 'typeorm';
import { pickBy } from 'lodash';
import { convertGqlOrderByClausesToORM } from '@/services/OrderByService';
import SymptomQuestionnaireFields from '@/interfaces/SymptomQuestionnaireFields';
import Paginatable from '@/graphql/types/args/query/reusable/paginatable/Paginatable';
import OrderByClause from '@/graphql/types/args/query/reusable/orderable/OrderByClause';
import { convertGqlPaginationToORM, convertToPaginatedResponse } from '@/services/PaginationService';
import SymptomQuestionnairesArgs from '@/graphql/types/args/query/symptom-questionnaire/SymptomQuestionnairesArgs';
import { GetSymptomQuestionnairesArgs, findAndCountSymptomQuestionnaires } from '@/services/SymptomQuestionnaireService';
import PaginatedSymptomQuestionnaires from '@/graphql/types/responses/symptom-questionnaire/PaginatedSymptomQuestionnaires';

type Args = {
  pagination: Paginatable;
  orderBy: OrderByClause<SymptomQuestionnaireFields>[];
  where: Pick<SymptomQuestionnairesArgs, 'nameForManagement' | 'isPublished' | 'currentVersionsOnly' | 'withDeleted'>;
};

function convertGqlWhereClauseToORM(where: Args['where']): GetSymptomQuestionnairesArgs['where'] {
  const { isPublished } = where;
  const nameForManagement = where.nameForManagement ? Like(`%${where.nameForManagement}%`) : undefined;

  return pickBy({ isPublished, nameForManagement }, Boolean);
}

export default async function (args: Args): Promise<PaginatedSymptomQuestionnaires> {
  const { withDeleted, currentVersionsOnly } = args.where;
  const where = convertGqlWhereClauseToORM(args.where);
  const pagination = convertGqlPaginationToORM(args.pagination);
  const orderBy = convertGqlOrderByClausesToORM(args.orderBy);

  const [results, totalResultsCount] = await findAndCountSymptomQuestionnaires({
    currentVersionsOnly, pagination, where, withDeleted, orderBy,
  });

  const { pageNumber, resultsPerPage } = args.pagination;
  const response = convertToPaginatedResponse({
    pageNumber, resultsPerPage, totalResultsCount, results,
  });

  return response;
}
