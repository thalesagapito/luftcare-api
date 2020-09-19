import { IsNotEmpty } from 'class-validator';
import { Field, ArgsType, ID } from 'type-graphql';
import Questionnaire from '@/entities/Questionnaire';
import QuestionnaireInput from './QuestionnaireInput';

@ArgsType()
export default class UpdateQuestionnaireArgs implements Partial<Questionnaire> {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => QuestionnaireInput)
  @IsNotEmpty()
  questionnaire: QuestionnaireInput;
}
