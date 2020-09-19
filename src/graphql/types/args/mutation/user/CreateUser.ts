import User from '@/entities/User';
import { Field, InputType } from 'type-graphql';
import {
  IsEmail,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { UserRole } from '@/enums';

@InputType({ description: 'Required data to manually create an application user through the admin panel' })
export default class CreateUserInput implements Partial<User> {
  @Field(() => String, { description: 'MaxLength: 500' })
  @IsNotEmpty()
  @MaxLength(500)
  name: string;

  @Field(() => String, { description: 'MaxLength: 500' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(500)
  email: string;

  @Field(() => String, { description: 'MinLength: 6' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => String, { description: 'MaxLength: 20. Should contain special characters, like: +55 (41) 98765-4321.' })
  @MaxLength(20)
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @Field(() => UserRole, { defaultValue: UserRole.PATIENT })
  role: UserRole;
}
