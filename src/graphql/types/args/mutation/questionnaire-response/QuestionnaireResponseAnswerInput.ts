import {
  ID,
  Field,
  InputType,
} from 'type-graphql';
import {
  IsUUID,
  isEmpty,
  MaxLength,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

@InputType()
export default class QuestionnaireResponseAnswerInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  @ValidateIf(({ writtenText }) => isEmpty(writtenText))
  choiceId?: string;

  @Field({ nullable: true, description: 'Can be null, in cases where the answer has multiple choices' })
  @IsNotEmpty()
  @MaxLength(3000)
  @ValidateIf(({ choiceId }) => isEmpty(choiceId))
  writtenText?: string;
}
