import { ObjectType, Field } from 'type-graphql';
import SymptomAnalysisForm from '@/entities/SymptomAnalysisForm';
import PaginatedResponse from '@/graphql/types/responses/reusable/PaginatedResponse';

@ObjectType()
export default class PaginatedSymptomAnalysisFormResponse extends PaginatedResponse<SymptomAnalysisForm> {
  @Field(() => [SymptomAnalysisForm])
  results: SymptomAnalysisForm[];
}
