import { Field, InputType } from 'type-graphql';
import { OrderByClauseDirection, OrderByClauseNullsPosition } from '@/enums';

@InputType()
export default class OrderByClause<Entity> {
  @Field(() => String)
  columnName: keyof Entity;

  @Field(() => OrderByClauseDirection, { defaultValue: OrderByClauseDirection.DESC })
  direction: OrderByClauseDirection;

  // apparently this can't be used when querying entities, only defining the default order on an entity
  @Field(() => OrderByClauseNullsPosition, { defaultValue: OrderByClauseNullsPosition.NULLS_LAST })
  nulls: OrderByClauseNullsPosition;
}
