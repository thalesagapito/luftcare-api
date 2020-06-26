import { Field, InputType, Int } from 'type-graphql';
import {
  IsNumber,
  MaxLength,
  ValidateIf,
  IsNotEmpty,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
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
  @IsNotEmpty()
  kind: SymptomQuestionnaireQuestionKind;

  @Field(() => [SymptomQuestionnaireQuestionChoiceInput], { nullable: true })
  @ArrayMinSize(2, { message: 'Cada pergunta deve ter pelo menos 2 alternativas' })
  @ValidateNested()
  @ValidateIf(({ kind }) => kind === SymptomQuestionnaireQuestionKind.MULTIPLE_CHOICE)
  possibleChoices?: SymptomQuestionnaireQuestionChoiceInput[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  presentationOrder: number;
}
