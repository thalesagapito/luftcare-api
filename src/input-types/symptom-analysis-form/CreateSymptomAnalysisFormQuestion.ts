import { Field, InputType } from 'type-graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { OmitFrom } from '@/types/Helpers';
import { SymptomAnalysisFormQuestionKind } from '@/enums';
import SymptomAnalysisFormQuestion from '@/entities/SymptomAnalysisFormQuestion';
import CreateSymptomAnalysisFormQuestionChoiceInput from './CreateSymptomAnalysisFormQuestionChoice';


interface AnalysisFormQuestionInput extends OmitFrom<SymptomAnalysisFormQuestion, 'possibleChoices'> {
  possibleChoices: CreateSymptomAnalysisFormQuestionChoiceInput[];
}

@InputType()
export default class CreateSymptomAnalysisFormQuestionInput implements Partial<AnalysisFormQuestionInput> {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @Field(() => SymptomAnalysisFormQuestionKind)
  kind: SymptomAnalysisFormQuestionKind;

  @Field(() => [CreateSymptomAnalysisFormQuestionChoiceInput], { nullable: true })
  possibleChoices?: CreateSymptomAnalysisFormQuestionChoiceInput[];
}
