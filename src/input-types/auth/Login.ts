import User from '@/entities/User';
import { Field, InputType } from 'type-graphql';
import {
  IsEmail, IsNotEmpty, MaxLength, MinLength,
} from 'class-validator';

@InputType()
export default class LoginInput implements Partial<User> {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
