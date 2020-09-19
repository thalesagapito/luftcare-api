import User from '@/entities/User';
import { Field, InputType } from 'type-graphql';
import {
  IsEmail,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

@InputType({ description: 'Required data to register an application user from the register form' })
export default class RegisterUserInput implements Partial<User> {
  @Field(() => String, { description: 'MaxLength: 500' })
  @IsNotEmpty()
  @MaxLength(500)
  name: string;

  @Field(() => String, { description: 'MaxLength: 500' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(500)
  email: string;

  @Field(() => String, { description: 'MinLength: 6, MaxLength: 500' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(500)
  password: string;

  @Field(() => String, { description: 'MaxLength: 20. Should contain special characters, like: +55 (41) 98765-4321.' })
  @MaxLength(20)
  @IsPhoneNumber('BR')
  phoneNumber: string;
}
