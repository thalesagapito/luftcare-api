import User from '@/entities/User';
import { Field, InputType } from 'type-graphql';
import {
  IsEmail, IsNotEmpty, MaxLength, MinLength, IsPhoneNumber,
} from 'class-validator';

@InputType({ description: 'Required data to register an application user from the register form' })
export default class RegisterUserInput implements Partial<User> {
  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(500)
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field()
  @IsPhoneNumber('BR')
  phoneNumber: string;
}
