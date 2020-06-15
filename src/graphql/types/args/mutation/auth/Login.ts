import User from '@/entities/User';
import { Field, ArgsType } from 'type-graphql';
import {
  IsEmail, IsNotEmpty, MaxLength, MinLength,
} from 'class-validator';

@ArgsType()
export default class LoginInput implements Partial<User> {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(500)
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
