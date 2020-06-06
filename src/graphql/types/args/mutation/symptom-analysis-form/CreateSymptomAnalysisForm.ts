import { Field, InputType } from 'type-graphql';
import {
  IsNotEmpty, MaxLength, IsBoolean, ArrayNotEmpty,
} from 'class-validator';
import { Override } from '@/helper-types';
import SymptomAnalysisForm from '@/entities/SymptomAnalysisForm';
import CreateSymptomAnalysisFormQuestionInput from './CreateSymptomAnalysisFormQuestion';

type FormInputType = Partial<Override<SymptomAnalysisForm, { questions: CreateSymptomAnalysisFormQuestionInput[] }>>;

@InputType()
export default class CreateSymptomAnalysisFormInput implements FormInputType {
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

  @Field(() => [CreateSymptomAnalysisFormQuestionInput])
  @ArrayNotEmpty()
  questions: CreateSymptomAnalysisFormQuestionInput[];
}
