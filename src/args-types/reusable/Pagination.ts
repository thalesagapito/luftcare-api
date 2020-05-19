import { Field, InputType } from 'type-graphql';
import { OrderByClauseDirection, OrderByClauseNullsPosition } from '@/enums';

export interface PaginationArgs {
  pageNumber: number;
  resultsPerPage: number;
  orderBy?: OrderByClause[];
}

@InputType()
export class OrderByClause {
  @Field()
  columnName: string;

  @Field(() => OrderByClauseDirection, { defaultValue: OrderByClauseDirection.DESC })
  direction: OrderByClauseDirection;

  @Field(() => OrderByClauseNullsPosition, { defaultValue: OrderByClauseNullsPosition.NULLS_LAST })
  nulls: OrderByClauseNullsPosition;
}
