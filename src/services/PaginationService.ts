/* eslint-disable object-curly-newline */
import Paginatable from '@/graphql/types/args/query/reusable/paginatable/Paginatable';
import PaginatedResponse from '@/graphql/types/responses/reusable/PaginatedResponse';

export type ORMPagination = {
  skip: number;
  take: number;
};

type ConvertToPaginatedResponseArgs<T> = {
  totalResultsCount: number;
  resultsPerPage: number;
  pageNumber: number;
  results: T[];
};

export function convertGqlPaginationToORM(paginationArgs: Paginatable): ORMPagination {
  const { pageNumber, resultsPerPage } = paginationArgs;
  const skip = (pageNumber - 1) * resultsPerPage;

  return { skip, take: resultsPerPage };
}

export function convertToPaginatedResponse<T>(args: ConvertToPaginatedResponseArgs<T>): PaginatedResponse<T> {
  const { results, totalResultsCount, resultsPerPage, pageNumber } = args;
  const totalPagesCount = Math.ceil(totalResultsCount / resultsPerPage);
  const hasMorePages = pageNumber < totalPagesCount;

  return { results, totalResultsCount, hasMorePages };
}
