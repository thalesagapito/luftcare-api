import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { OmitFrom } from '@/helper-types';
import { SymptomQuestionnaireQuestionKind } from '@/enums';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';
import CreateSymptomQuestionnaireQuestionChoiceInput from '@/graphql/types/args/mutation/symptom-questionnaire/CreateSymptomQuestionnaireQuestionChoice';

interface QuestionnaireQuestionInput extends OmitFrom<SymptomQuestionnaireQuestion, 'possibleChoices'> {
  possibleChoices: CreateSymptomQuestionnaireQuestionChoiceInput[];
}

@InputType()
export default class CreateSymptomQuestionnaireQuestionInput implements Partial<QuestionnaireQuestionInput> {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  nameForManagement: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @Field(() => SymptomQuestionnaireQuestionKind)
  kind: SymptomQuestionnaireQuestionKind;

  @Field(() => [CreateSymptomQuestionnaireQuestionChoiceInput], { nullable: true })
  // TODO conditional validation here
  possibleChoices?: CreateSymptomQuestionnaireQuestionChoiceInput[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  presentationOrder: number;
}
