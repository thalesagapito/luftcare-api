import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import QuestionnaireQuestionChoiceFields from '@/interfaces/QuestionnaireQuestionChoiceFields';

@InputType()
export default class QuestionnaireQuestionChoiceInput implements Partial<QuestionnaireQuestionChoiceFields> {
  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  nameForManagement: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  presentationOrder: number;
}
