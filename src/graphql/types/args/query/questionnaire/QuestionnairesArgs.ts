import { MaxLength, Min, Max } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import Orderable from '@/graphql/types/args/query/reusable/orderable/Orderable';
import QuestionnaireFields from '@/interfaces/QuestionnaireFields';
import Paginatable from '@/graphql/types/args/query/reusable/paginatable/Paginatable';

@ArgsType()
export default class QuestionnairesArgs extends Orderable<QuestionnaireFields> implements Partial<QuestionnaireFields>, Paginatable {
  @Field({ nullable: true })
  @MaxLength(500)
  nameForManagement?: string;

  @Field({ nullable: true })
  isPublished?: boolean;

  @Field({ nullable: true })
  currentVersionsOnly?: boolean;

  @Field({ defaultValue: false })
  withDeleted?: boolean;

  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  pageNumber: Paginatable['pageNumber'];

  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @Max(100)
  resultsPerPage: Paginatable['resultsPerPage'];
}
