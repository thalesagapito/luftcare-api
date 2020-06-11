import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { OmitFrom } from '@/helper-types';
import { SymptomQuestionnaireQuestionKind } from '@/enums';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';
import UpdateSymptomQuestionnaireQuestionChoiceInput from '@/graphql/types/args/mutation/symptom-questionnaire/UpdateSymptomQuestionnaireQuestionChoice';

interface QuestionnaireQuestionInput extends OmitFrom<SymptomQuestionnaireQuestion, 'possibleChoices'> {
  possibleChoices: UpdateSymptomQuestionnaireQuestionChoiceInput[];
}

@InputType()
export default class UpdateSymptomQuestionnaireQuestionInput implements Partial<QuestionnaireQuestionInput> {
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

  @Field(() => [UpdateSymptomQuestionnaireQuestionChoiceInput], { nullable: true })
  // TODO conditional validation here
  possibleChoices?: UpdateSymptomQuestionnaireQuestionChoiceInput[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  presentationOrder: number;
}
