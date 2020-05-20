import { Max } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import PaginationArgs from '@/graphql/types/args/query/reusable/Pagination';
import SymptomAnalysisFormFields from '@/interfaces/SymptomAnalysisFormFields';

@ArgsType()
export default class SymptomAnalysisFormsArgs extends PaginationArgs implements Partial<SymptomAnalysisFormFields> {
  @Field({ nullable: true })
  @Max(255)
  name?: string;

  @Field({ defaultValue: true })
  isPublished: boolean;

  @Field({ defaultValue: true })
  currentVersionsOnly: boolean;
}
