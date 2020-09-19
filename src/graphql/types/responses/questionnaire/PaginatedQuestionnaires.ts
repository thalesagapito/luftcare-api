import { ObjectType, Field } from 'type-graphql';
import Questionnaire from '@/entities/Questionnaire';
import PaginatedResponse from '@/graphql/types/responses/reusable/PaginatedResponse';

@ObjectType()
export default class PaginatedQuestionnaires extends PaginatedResponse<Questionnaire> {
  @Field(() => [Questionnaire])
  results: Questionnaire[];
}
