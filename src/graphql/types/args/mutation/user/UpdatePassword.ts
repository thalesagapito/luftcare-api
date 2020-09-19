import { ArgsType, Field } from 'type-graphql';
import { MinLength, IsNotEmpty } from 'class-validator';
import { CompareToField, ComparisonOperator } from '@/decorators/CompareToField.decorator';

@ArgsType()
export default class UpdatePasswordInput {
  @Field(() => String)
  @IsNotEmpty()
  @CompareToField('newPassword', ComparisonOperator.NOT_EQUAL_TO)
  currentPassword: string;

  @Field(() => String, { description: 'MinLength: 6' })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
