import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ isAbstract: true })
export default class PaginatedResponse<T> {
  // Must be extended
  results: T[];

  @Field(() => Int)
  totalResultsCount: number;

  @Field()
  hasMorePages: boolean;
}
