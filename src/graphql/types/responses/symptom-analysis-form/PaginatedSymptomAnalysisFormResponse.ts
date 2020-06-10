import { ObjectType, Field } from 'type-graphql';
import SymptomAnalysisQuestionnaire from '@/entities/SymptomAnalysisQuestionnaire';
import PaginatedResponse from '@/graphql/types/responses/reusable/PaginatedResponse';

@ObjectType()
export default class PaginatedSymptomAnalysisQuestionnaireResponse extends PaginatedResponse<SymptomAnalysisQuestionnaire> {
  @Field(() => [SymptomAnalysisQuestionnaire])
  results: SymptomAnalysisQuestionnaire[];
}
