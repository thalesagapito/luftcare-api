import { pickBy } from 'lodash';
import { getCustomRepository, Like } from 'typeorm';
import { convertGqlOrderByClausesToORM } from '@/services/OrderByService';
import QuestionnaireFields from '@/interfaces/QuestionnaireFields';
import Paginatable from '@/graphql/types/args/query/reusable/paginatable/Paginatable';
import OrderByClause from '@/graphql/types/args/query/reusable/orderable/OrderByClause';
import { convertGqlPaginationToORM, convertToPaginatedResponse } from '@/services/PaginationService';
import QuestionnairesArgs from '@/graphql/types/args/query/questionnaire/QuestionnairesArgs';
import PaginatedQuestionnaires from '@/graphql/types/responses/questionnaire/PaginatedQuestionnaires';
import QuestionnaireRepository, { GetQuestionnairesArgs } from '@/repositories/QuestionnaireRepository';

type Args = {
  pagination: Paginatable;
  orderBy: OrderByClause<QuestionnaireFields>[];
  where: Pick<QuestionnairesArgs, 'nameForManagement' | 'isPublished' | 'currentVersionsOnly' | 'withDeleted'>;
};

function convertGqlWhereClauseToORM(where: Args['where']): GetQuestionnairesArgs['where'] {
  const { isPublished } = where;
  const nameForManagement = where.nameForManagement ? Like(`%${where.nameForManagement}%`) : undefined;

  return pickBy({ isPublished, nameForManagement }, Boolean);
}

export default async function (args: Args): Promise<PaginatedQuestionnaires> {
  const questionnaireRepository = getCustomRepository(QuestionnaireRepository);

  const { withDeleted, currentVersionsOnly } = args.where;
  const where = convertGqlWhereClauseToORM(args.where);
  const pagination = convertGqlPaginationToORM(args.pagination);
  const orderBy = convertGqlOrderByClausesToORM(args.orderBy);

  const [results, totalResultsCount] = await questionnaireRepository.findAndCountQuestionnaires({
    currentVersionsOnly, pagination, where, withDeleted, orderBy,
  });

  const { pageNumber, resultsPerPage } = args.pagination;
  const response = convertToPaginatedResponse({
    pageNumber, resultsPerPage, totalResultsCount, results,
  });

  return response;
}
