import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field, ID } from 'type-graphql';
import User from '@/entities/User';

@ArgsType()
export default class ChangeLoginCapabilityInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: User['id'];

  @Field(() => Boolean)
  @IsNotEmpty()
  canLogin: User['canLogin'];
}
