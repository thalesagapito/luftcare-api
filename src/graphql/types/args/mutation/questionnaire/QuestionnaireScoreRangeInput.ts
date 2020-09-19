import { Field, InputType, Int } from 'type-graphql';
import { IsInt, MaxLength, IsNotEmpty } from 'class-validator';
import { QuestionnaireScoreRangeColor } from '@/enums';
import { CompareToField, ComparisonOperator } from '@/decorators/CompareToField.decorator';
import QuestionnaireScoreRangeFields from '@/interfaces/QuestionnaireScoreRangeFields';

@InputType()
export default class QuestionnaireScoreRangeInput implements Partial<QuestionnaireScoreRangeFields> {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  @CompareToField('maxScore', ComparisonOperator.LESS_THAN_OR_EQUAL_TO)
  minScore: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  @CompareToField('minScore', ComparisonOperator.GREATER_THAN_OR_EQUAL_TO)
  maxScore: number;

  @Field(() => QuestionnaireScoreRangeColor)
  @IsNotEmpty()
  color: QuestionnaireScoreRangeColor;

  @Field(() => String, { description: 'MaxLength: 500' })
  @IsNotEmpty()
  @MaxLength(500)
  title: string;

  @Field(() => String, { description: 'MaxLength: 2000' })
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;
}
