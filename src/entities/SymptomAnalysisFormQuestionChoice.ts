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
import SymptomAnalysisQuestionnaireQuestionFields from '@/interfaces/SymptomAnalysisQuestionnaireQuestionFields';
import SymptomAnalysisQuestionnaireQuestionChoiceFields from '@/interfaces/SymptomAnalysisQuestionnaireQuestionChoiceFields';

@GraphqlType()
@DatabaseTable()
export default class SymptomAnalysisQuestionnaireQuestionChoice extends BaseEntity implements SymptomAnalysisQuestionnaireQuestionChoiceFields {
  @GraphqlField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @GraphqlField({ description: 'Choice name only for internal use. Only questionnaire-creator admins will see this.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  nameForManagement: string;

  @GraphqlField({ description: 'Choice text, what will be shown to the user. Localization is not a concern.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  text: string;

  @GraphqlField(() => Int,
    { description: 'When the questionnaire is answered, this field is used to calculate the result.' })
  @DatabaseColumn({ type: 'int' })
  value: number;

  @ManyToOne('SymptomAnalysisQuestionnaireQuestion', 'choices')
  question: SymptomAnalysisQuestionnaireQuestionFields;

  @GraphqlField(() => Int)
  @DatabaseColumn('int')
  presentationOrder: number;
}
