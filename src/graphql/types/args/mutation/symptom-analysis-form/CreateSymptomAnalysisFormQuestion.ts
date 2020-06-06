import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { OmitFrom } from '@/helper-types';
import { SymptomAnalysisFormQuestionKind } from '@/enums';
import SymptomAnalysisFormQuestion from '@/entities/SymptomAnalysisFormQuestion';
import CreateSymptomAnalysisFormQuestionChoiceInput from '@/graphql/types/args/mutation/symptom-analysis-form/CreateSymptomAnalysisFormQuestionChoice';

interface AnalysisFormQuestionInput extends OmitFrom<SymptomAnalysisFormQuestion, 'possibleChoices'> {
  possibleChoices: CreateSymptomAnalysisFormQuestionChoiceInput[];
}

@InputType()
export default class CreateSymptomAnalysisFormQuestionInput implements Partial<AnalysisFormQuestionInput> {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  nameForManagement: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @Field(() => SymptomAnalysisFormQuestionKind)
  kind: SymptomAnalysisFormQuestionKind;

  @Field(() => [CreateSymptomAnalysisFormQuestionChoiceInput], { nullable: true })
  // TODO conditional validation here
  possibleChoices?: CreateSymptomAnalysisFormQuestionChoiceInput[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  presentationOrder: number;
}
