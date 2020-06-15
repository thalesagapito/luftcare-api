import { Field, InputType, Int } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { SymptomQuestionnaireQuestionKind } from '@/enums';
import SymptomQuestionnaireQuestionFields from '@/interfaces/SymptomQuestionnaireQuestionFields';
import SymptomQuestionnaireQuestionChoiceInput from './SymptomQuestionnaireQuestionChoiceInput';

@InputType()
export default class SymptomQuestionnaireQuestionInput implements Partial<SymptomQuestionnaireQuestionFields> {
  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  nameForManagement: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @Field(() => SymptomQuestionnaireQuestionKind)
  kind: SymptomQuestionnaireQuestionKind;

  @Field(() => [SymptomQuestionnaireQuestionChoiceInput], { nullable: true })
  // TODO conditional validation here
  possibleChoices?: SymptomQuestionnaireQuestionChoiceInput[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  presentationOrder: number;
}
