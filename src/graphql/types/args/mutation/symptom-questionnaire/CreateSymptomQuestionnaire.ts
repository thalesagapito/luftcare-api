import { Field, InputType } from 'type-graphql';
import {
  IsNotEmpty, MaxLength, IsBoolean, ArrayNotEmpty,
} from 'class-validator';
import { Override } from '@/helper-types';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import CreateSymptomQuestionnaireQuestionInput from './CreateSymptomQuestionnaireQuestion';

type QuestionnaireInputType = Partial<Override<SymptomQuestionnaire, { questions: CreateSymptomQuestionnaireQuestionInput[] }>>;

@InputType()
export default class CreateSymptomQuestionnaireInput implements QuestionnaireInputType {
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

  @Field(() => [CreateSymptomQuestionnaireQuestionInput])
  @ArrayNotEmpty()
  questions: CreateSymptomQuestionnaireQuestionInput[];
}
