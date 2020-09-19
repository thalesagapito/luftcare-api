import { Field, InputType, Int } from 'type-graphql';
import { IsInt, MaxLength, IsNotEmpty } from 'class-validator';
import { SymptomQuestionnaireScoreRangeColor } from '@/enums';
import { CompareToField, ComparisonOperator } from '@/decorators/CompareToField.decorator';
import SymptomQuestionnaireScoreRangeFields from '@/interfaces/SymptomQuestionnaireScoreRangeFields';

@InputType()
export default class SymptomQuestionnaireScoreRangeInput implements Partial<SymptomQuestionnaireScoreRangeFields> {
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

  @Field(() => SymptomQuestionnaireScoreRangeColor)
  @IsNotEmpty()
  color: SymptomQuestionnaireScoreRangeColor;

  @Field(() => String, { description: 'MaxLength: 500' })
  @IsNotEmpty()
  @MaxLength(500)
  title: string;

  @Field(() => String, { description: 'MaxLength: 2000' })
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;
}
