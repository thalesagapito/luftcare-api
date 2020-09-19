import { Field, InputType, Int } from 'type-graphql';
import {
  IsNumber,
  MaxLength,
  ValidateIf,
  IsNotEmpty,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { QuestionnaireQuestionKind } from '@/enums';
import QuestionnaireQuestionFields from '@/interfaces/QuestionnaireQuestionFields';
import QuestionnaireQuestionChoiceInput from './QuestionnaireQuestionChoiceInput';

@InputType()
export default class QuestionnaireQuestionInput implements Partial<QuestionnaireQuestionFields> {
  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  nameForManagement: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @Field(() => QuestionnaireQuestionKind)
  @IsNotEmpty()
  kind: QuestionnaireQuestionKind;

  @Field(() => [QuestionnaireQuestionChoiceInput], { nullable: true })
  @ArrayMinSize(2, { message: 'Cada pergunta deve ter pelo menos 2 alternativas' })
  @ValidateNested()
  @ValidateIf(({ kind }) => kind === QuestionnaireQuestionKind.MULTIPLE_CHOICE)
  possibleChoices?: QuestionnaireQuestionChoiceInput[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  presentationOrder: number;
}
