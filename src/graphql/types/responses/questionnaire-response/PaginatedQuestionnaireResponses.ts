import { ObjectType, Field } from 'type-graphql';
import PaginatedResponse from '@/graphql/types/responses/reusable/PaginatedResponse';
import QuestionnaireResponse from '@/entities/QuestionnaireResponse';

@ObjectType()
export default class PaginatedQuestionnaireResponses extends PaginatedResponse<QuestionnaireResponse> {
  @Field(() => [QuestionnaireResponse])
  results: QuestionnaireResponse[];
}
