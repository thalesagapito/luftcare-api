import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import SymptomQuestionnaireQuestionChoiceFields from '@/interfaces/SymptomQuestionnaireQuestionChoiceFields';

@InputType()
export default class SymptomQuestionnaireQuestionChoiceInput implements Partial<SymptomQuestionnaireQuestionChoiceFields> {
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
