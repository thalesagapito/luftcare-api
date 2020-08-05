import OrderByClause from '@/graphql/types/args/query/reusable/orderable/OrderByClause';
import { OrderByCondition } from 'typeorm';
import { mapKeys } from 'lodash';

export function convertGqlOrderByClauseToORM<T>(orderByClause: OrderByClause<T>): OrderByCondition {
  const { columnName, direction: order, nulls } = orderByClause;
  return { [columnName]: { order, nulls } };
}

export function convertGqlOrderByClausesToORM<T>(orderByClauses: OrderByClause<T>[]): OrderByCondition {
  const ormClauses = orderByClauses.map(convertGqlOrderByClauseToORM);
  return ormClauses.reduce((acc, clause) => ({ ...acc, ...clause }), {});
}

export function applyPrefixToOrderByCondition(condition: OrderByCondition, prefix: string): OrderByCondition {
  return mapKeys(condition, (_, key) => `${prefix}${key}`);
}
