import { ObjectType, Field } from 'type-graphql';
import PaginatedResponse from '@/graphql/types/responses/reusable/PaginatedResponse';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';

@ObjectType()
export default class PaginatedSymptomQuestionnaireResponses extends PaginatedResponse<SymptomQuestionnaireResponse> {
  @Field(() => [SymptomQuestionnaireResponse])
  results: SymptomQuestionnaireResponse[];
}
