import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import SymptomQuestionnaireQuestionChoice from '@/entities/SymptomQuestionnaireQuestionChoice';

@InputType()
export default class CreateSymptomQuestionnaireQuestionChoiceInput implements Partial<SymptomQuestionnaireQuestionChoice> {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
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
