/* eslint-disable import/prefer-default-export */
import { FindManyOptions } from 'typeorm';
import PaginationArgs from '@/graphql/types/args/query/reusable/Pagination';
import OrderByClause from '@/graphql/types/args/query/reusable/OrderByClause';
import PaginatedResponse from '@/graphql/types/responses/reusable/PaginatedResponse';

export type ORMPagination = Pick<FindManyOptions, 'skip' | 'take' | 'order'>;

type ConvertToPaginatedResponseArgs<T> = {
  totalResultsCount: number;
  resultsPerPage: number;
  pageNumber: number;
  results: T[];
};

function mapOrderByClauseArrayToObject<T>(orderByClauses: OrderByClause<T>[]): ORMPagination['order'] {
  return orderByClauses.reduce((acc, { columnName, direction }) => ({ ...acc, [columnName]: direction }), {});
}

export function convertGqlPaginationToORM<T>(paginationArgs: PaginationArgs<T>): ORMPagination {
  const { pageNumber, resultsPerPage, orderBy = [] } = paginationArgs;

  const skip = (pageNumber - 1) * resultsPerPage;
  const order = mapOrderByClauseArrayToObject(orderBy);

  return { skip, order, take: resultsPerPage };
}

export function convertToPaginatedResponse<T>(args: ConvertToPaginatedResponseArgs<T>): PaginatedResponse<T> {
  const {
    results, totalResultsCount, resultsPerPage, pageNumber,
  } = args;
  const totalPagesCount = Math.ceil(totalResultsCount / resultsPerPage);
  const hasMorePages = pageNumber < totalPagesCount;

  return { results, totalResultsCount, hasMorePages };
}
