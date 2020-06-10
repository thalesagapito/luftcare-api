import { Max } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import PaginationArgs from '@/graphql/types/args/query/reusable/Pagination';
import SymptomAnalysisQuestionnaireFields from '@/interfaces/SymptomAnalysisQuestionnaireFields';

@ArgsType()
export default class SymptomAnalysisQuestionnairesArgs extends PaginationArgs<SymptomAnalysisQuestionnaireFields> implements Partial<SymptomAnalysisQuestionnaireFields> {
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
