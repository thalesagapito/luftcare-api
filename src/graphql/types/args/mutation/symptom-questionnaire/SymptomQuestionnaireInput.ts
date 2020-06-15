import { Field, InputType } from 'type-graphql';
import {
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';
import SymptomQuestionnaireFields from '@/interfaces/SymptomQuestionnaireFields';
import SymptomQuestionnaireQuestionInput from './SymptomQuestionnaireQuestionInput';

@InputType()
export default class SymptomQuestionnaireInput implements Partial<SymptomQuestionnaireFields> {
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

  @Field(() => [SymptomQuestionnaireQuestionInput])
  @ArrayNotEmpty()
  questions: SymptomQuestionnaireQuestionInput[];
}
