import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { OmitFrom } from '@/helper-types';
import { SymptomAnalysisQuestionnaireQuestionKind } from '@/enums';
import SymptomAnalysisQuestionnaireQuestion from '@/entities/SymptomAnalysisQuestionnaireQuestion';
import CreateSymptomAnalysisQuestionnaireQuestionChoiceInput from '@/graphql/types/args/mutation/symptom-analysis-questionnaire/CreateSymptomAnalysisQuestionnaireQuestionChoice';

interface AnalysisQuestionnaireQuestionInput extends OmitFrom<SymptomAnalysisQuestionnaireQuestion, 'possibleChoices'> {
  possibleChoices: CreateSymptomAnalysisQuestionnaireQuestionChoiceInput[];
}

@InputType()
export default class CreateSymptomAnalysisQuestionnaireQuestionInput implements Partial<AnalysisQuestionnaireQuestionInput> {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  nameForManagement: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @Field(() => SymptomAnalysisQuestionnaireQuestionKind)
  kind: SymptomAnalysisQuestionnaireQuestionKind;

  @Field(() => [CreateSymptomAnalysisQuestionnaireQuestionChoiceInput], { nullable: true })
  // TODO conditional validation here
  possibleChoices?: CreateSymptomAnalysisQuestionnaireQuestionChoiceInput[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  presentationOrder: number;
}
