import { IsNotEmpty } from 'class-validator';
import { Field, ArgsType, ID } from 'type-graphql';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import SymptomQuestionnaireInput from './SymptomQuestionnaireInput';

@ArgsType()
export default class UpdateSymptomQuestionnaireInputArgs implements Partial<SymptomQuestionnaire> {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => SymptomQuestionnaireInput)
  @IsNotEmpty()
  questionnaire: SymptomQuestionnaireInput;
}
