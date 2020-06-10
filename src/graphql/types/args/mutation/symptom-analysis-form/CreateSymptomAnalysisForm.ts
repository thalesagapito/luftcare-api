import { Field, InputType } from 'type-graphql';
import {
  IsNotEmpty, MaxLength, IsBoolean, ArrayNotEmpty,
} from 'class-validator';
import { Override } from '@/helper-types';
import SymptomAnalysisQuestionnaire from '@/entities/SymptomAnalysisQuestionnaire';
import CreateSymptomAnalysisQuestionnaireQuestionInput from './CreateSymptomAnalysisQuestionnaireQuestion';

type QuestionnaireInputType = Partial<Override<SymptomAnalysisQuestionnaire, { questions: CreateSymptomAnalysisQuestionnaireQuestionInput[] }>>;

@InputType()
export default class CreateSymptomAnalysisQuestionnaireInput implements QuestionnaireInputType {
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

  @Field(() => [CreateSymptomAnalysisQuestionnaireQuestionInput])
  @ArrayNotEmpty()
  questions: CreateSymptomAnalysisQuestionnaireQuestionInput[];
}
