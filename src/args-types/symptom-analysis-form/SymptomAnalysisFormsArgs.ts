import { Min, Max } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import { OrderByClause, PaginationArgs } from '@/args-types/reusable/Pagination';

@ArgsType()
export default class SymptomAnalysisFormsArgs implements PaginationArgs {
  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  pageNumber: number;

  @Field(() => Int, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  resultsPerPage: number;

  @Field(() => [OrderByClause], { nullable: true })
  orderBy: OrderByClause[];
}
