import { Field, InputType } from 'type-graphql';
import {
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import QuestionnaireFields from '@/interfaces/QuestionnaireFields';
import QuestionnaireQuestionInput from './QuestionnaireQuestionInput';
import QuestionnaireScoreRangeInput from './QuestionnaireScoreRangeInput';

@InputType()
export default class QuestionnaireInput implements Partial<QuestionnaireFields> {
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

  @Field(() => [QuestionnaireQuestionInput])
  @ArrayNotEmpty({ message: 'O questionário deve ter no mínimo uma pergunta' })
  @ValidateNested()
  questions: QuestionnaireQuestionInput[];

  @Field(() => [QuestionnaireScoreRangeInput])
  @ArrayNotEmpty({ message: 'O questionário deve ter no mínimo um intervalo de pontuação' })
  @ValidateNested()
  scoreRanges: QuestionnaireScoreRangeInput[];
}
