import { Max } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import PaginationArgs from '@/graphql/types/args/query/reusable/Pagination';
import SymptomQuestionnaireFields from '@/interfaces/SymptomQuestionnaireFields';

@ArgsType()
export default class SymptomQuestionnairesArgs extends PaginationArgs<SymptomQuestionnaireFields> implements Partial<SymptomQuestionnaireFields> {
  @Field({ nullable: true })
  @Max(255)
  nameForManagement?: string;

  @Field({ nullable: true })
  isPublished?: boolean;

  @Field({ nullable: true })
  currentVersionsOnly?: boolean;

  @Field({ defaultValue: false })
  withDeleted?: boolean;
}
