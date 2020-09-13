import User from '@/entities/User';
import { Field, InputType } from 'type-graphql';
import {
  IsEmail,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { UserKind, UserRole } from '@/enums';

@InputType({ description: 'Required data to manually create an application user through the admin panel' })
export default class CreateUserInput implements Partial<User> {
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

  @Field(() => UserRole, { defaultValue: UserRole.NON_ADMIN })
  role: UserRole;

  @Field(() => UserKind, { defaultValue: UserKind.PATIENT })
  kind: UserKind;
}
