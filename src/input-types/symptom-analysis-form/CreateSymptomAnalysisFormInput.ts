import { Field, InputType } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';
import SymptomAnalysisForm from '@/entities/SymptomAnalysisForm';

@InputType()
export default class CreateSymptomAnalysisFormInput implements Partial<SymptomAnalysisForm> {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsNotEmpty()
  isPublished: boolean;
}
