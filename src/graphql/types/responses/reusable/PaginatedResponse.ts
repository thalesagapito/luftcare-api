import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ isAbstract: true })
export default class PaginatedResponse<T> {
  // Must be extended
  records: T[];

  @Field(() => Int)
  totalRecords: number;

  @Field()
  hasMorePages: boolean;
}
