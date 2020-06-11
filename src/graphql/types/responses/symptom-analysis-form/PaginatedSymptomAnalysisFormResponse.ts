import { ObjectType, Field } from 'type-graphql';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import PaginatedResponse from '@/graphql/types/responses/reusable/PaginatedResponse';

@ObjectType()
export default class PaginatedSymptomQuestionnaireResponse extends PaginatedResponse<SymptomQuestionnaire> {
  @Field(() => [SymptomQuestionnaire])
  results: SymptomQuestionnaire[];
}
