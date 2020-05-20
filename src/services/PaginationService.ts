/* eslint-disable import/prefer-default-export */
import PaginationArgs from '@/graphql/types/args/query/reusable/Pagination';
import { OrderByCondition } from 'typeorm';
import OrderByClause from '@/graphql/types/args/query/reusable/OrderByClause';

type ORMPagination = {
  skip: number;
  take: number;
  order: OrderByCondition;
};

function mapOrderByClauseArrayToObject(orderByClauses: OrderByClause[]): OrderByCondition {
  return orderByClauses.reduce((acc, { columnName, direction }) => ({ ...acc, [columnName]: direction }), {});
}

export function convertGqlPaginationToORM(paginationArgs: PaginationArgs): ORMPagination {
  const { pageNumber, resultsPerPage, orderBy = [] } = paginationArgs;

  const skip = (pageNumber - 1) * resultsPerPage;
  const order: OrderByCondition = mapOrderByClauseArrayToObject(orderBy);

  return {
    skip,
    order,
    take: resultsPerPage,
  };
}
