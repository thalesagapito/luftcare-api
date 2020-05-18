import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import SymptomAnalysisFormQuestionChoice from '@/entities/SymptomAnalysisFormQuestionChoice';

@InputType()
export default class CreateSymptomAnalysisFormQuestionChoiceInput implements Partial<SymptomAnalysisFormQuestionChoice> {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
