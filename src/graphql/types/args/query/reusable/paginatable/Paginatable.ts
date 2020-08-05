import { Field, ArgsType, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export default abstract class Paginatable {
  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  pageNumber: number;

  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @Max(100)
  resultsPerPage: number;
}
