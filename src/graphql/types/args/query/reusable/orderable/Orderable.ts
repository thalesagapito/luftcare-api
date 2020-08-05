import { Field, ArgsType } from 'type-graphql';
import OrderByClause from './OrderByClause';

@ArgsType()
export default class Orderable<Entity> {
  @Field(() => [OrderByClause], { nullable: true })
  orderBy?: OrderByClause<Entity>[];
}
