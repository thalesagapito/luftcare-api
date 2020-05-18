import {
  ID,
  Int,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import SymptomAnalysisFormQuestionFields from '@/interfaces/SymptomAnalysisFormQuestionFields';
import SymptomAnalysisFormQuestionChoiceFields from '@/interfaces/SymptomAnalysisFormQuestionChoiceFields';

@GraphqlType()
@DatabaseTable()
export default class SymptomAnalysisFormQuestionChoice extends BaseEntity implements SymptomAnalysisFormQuestionChoiceFields {
  @GraphqlField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @GraphqlField({ description: 'Choice name, only for internal use. Only form-creator admins will see this.' })
  @DatabaseColumn({ type: 'varchar', length: 255 })
  name: string;

  @GraphqlField({ description: 'Choice text, what will be shown to the user. Localization is not a concern.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  text: string;

  @GraphqlField(() => Int,
    {
      description: 'When the form is answered, this field is used to calculate the result.',
    })
  @DatabaseColumn({ type: 'int' })
  value: number;

  @ManyToOne('SymptomAnalysisFormQuestion', 'choices')
  question: SymptomAnalysisFormQuestionFields;

  @GraphqlField(() => Int)
  @DatabaseColumn('int')
  presentationOrder: number;
}
