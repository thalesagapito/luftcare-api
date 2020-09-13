import { ObjectType, Field } from 'type-graphql';
import User from '@/entities/User';
import PaginatedResponse from '@/graphql/types/responses/reusable/PaginatedResponse';

@ObjectType()
export default class PaginatedUsers extends PaginatedResponse<User> {
  @Field(() => [User])
  results: User[];
}
