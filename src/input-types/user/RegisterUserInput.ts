import User from '@/entities/User';
import { Field, InputType, Int } from 'type-graphql';
import {
  IsEmail, IsNotEmpty, MaxLength, MinLength,
} from 'class-validator';

@InputType({ description: 'Required data to register an application user from the register form' })
export default class RegisterUserInput implements Partial<User> {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => [Int], { nullable: true })
  preferredShoeSizesBR?: number[];
}
