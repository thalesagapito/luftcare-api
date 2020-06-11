import { Field, InputType, ID } from 'type-graphql';
import {
  IsNotEmpty, MaxLength, IsBoolean, ArrayNotEmpty,
} from 'class-validator';
import { Override } from '@/helper-types';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import UpdateSymptomQuestionnaireQuestionInput from './UpdateSymptomQuestionnaireQuestion';

type QuestionnaireInputType = Partial<Override<SymptomQuestionnaire, {
  questions: UpdateSymptomQuestionnaireQuestionInput[];
}>>;

@InputType()
export default class UpdateSymptomQuestionnaireInput implements QuestionnaireInputType {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  nameForManagement: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(500)
  nameForPresentation: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsNotEmpty()
  isPublished: boolean;

  @Field(() => [UpdateSymptomQuestionnaireQuestionInput])
  @ArrayNotEmpty()
  questions: UpdateSymptomQuestionnaireQuestionInput[];
}
