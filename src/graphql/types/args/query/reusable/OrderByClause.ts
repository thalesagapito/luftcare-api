import { Field, InputType } from 'type-graphql';
import { OrderByClauseDirection, OrderByClauseNullsPosition } from '@/enums';

@InputType()
export default class OrderByClause {
  @Field()
  columnName: string;

  @Field(() => OrderByClauseDirection, { defaultValue: OrderByClauseDirection.DESC })
  direction: OrderByClauseDirection;

  @Field(() => OrderByClauseNullsPosition, { defaultValue: OrderByClauseNullsPosition.NULLS_LAST })
  nulls: OrderByClauseNullsPosition;
}
