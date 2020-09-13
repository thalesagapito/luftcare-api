import { MaxLength, Min, Max } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import Orderable from '@/graphql/types/args/query/reusable/orderable/Orderable';
import UserFields from '@/interfaces/UserFields';
import Paginatable from '@/graphql/types/args/query/reusable/paginatable/Paginatable';

@ArgsType()
export default class UsersArgs extends Orderable<UserFields> implements Partial<UserFields>, Paginatable {
  @Field(() => String, { nullable: true, description: 'maxLength: 500' })
  @MaxLength(500)
  name?: string;

  @Field(() => String, { nullable: true, description: 'maxLength: 500' })
  @MaxLength(500)
  email?: string;

  @Field(() => String, { nullable: true, description: 'maxLength: 20' })
  @MaxLength(500)
  phoneNumber?: string;

  @Field({ defaultValue: false })
  withDeleted?: boolean;

  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  pageNumber: Paginatable['pageNumber'];

  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @Max(100)
  resultsPerPage: Paginatable['resultsPerPage'];
}
