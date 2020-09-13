/* eslint-disable max-len */
import { pickBy } from 'lodash';
import { Equal, getCustomRepository, Raw } from 'typeorm';
import UserFields from '@/interfaces/UserFields';
import UsersArgs from '@/graphql/types/args/query/user/UsersArgs';
import { convertGqlOrderByClausesToORM } from '@/services/OrderByService';
import PaginatedUsers from '@/graphql/types/responses/user/PaginatedUsers';
import Paginatable from '@/graphql/types/args/query/reusable/paginatable/Paginatable';
import UserRepository, { FindAndCountUsersArgs } from '@/repositories/UserRepository';
import OrderByClause from '@/graphql/types/args/query/reusable/orderable/OrderByClause';
import { convertGqlPaginationToORM, convertToPaginatedResponse } from '@/services/PaginationService';

type Args = {
  pagination: Paginatable;
  orderBy: OrderByClause<UserFields>[];
  where: Pick<UsersArgs, 'email' | 'name' | 'phoneNumber' | 'kind' | 'withDeleted'>;
};

function convertGqlWhereClauseToORM(where: Args['where']): FindAndCountUsersArgs['where'] {
  const ILike = (value: string) => Raw((alias) => `${alias} ILIKE '${value}'`);
  const IContains = (value: string) => ILike(`%${value}%`);
  const ContainsDigits = (value: string) => Raw((alias) => `regexp_replace(${alias}, '\\D*', '', 'g') LIKE '%${value}%'`);

  const email = where.email ? IContains(where.email) : undefined;
  const name = where.name ? IContains(where.name) : undefined;
  const kind = where.kind ? Equal(where.kind) : undefined;
  const phoneNumber = where.phoneNumber ? ContainsDigits(where.phoneNumber) : undefined;

  return pickBy({
    phoneNumber,
    email,
    kind,
    name,
  }, Boolean);
}

export default async function (args: Args): Promise<PaginatedUsers> {
  const { withDeleted } = args.where;
  const where = convertGqlWhereClauseToORM(args.where);
  const pagination = convertGqlPaginationToORM(args.pagination);
  const orderBy = convertGqlOrderByClausesToORM(args.orderBy);
  const userRepository = getCustomRepository(UserRepository);

  const [results, totalResultsCount] = await userRepository.findAndCountUsers({
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
