import {
  ID,
  Int,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';
import SymptomQuestionnaireQuestionFields from '@/interfaces/SymptomQuestionnaireQuestionFields';
import SymptomQuestionnaireQuestionChoiceFields from '@/interfaces/SymptomQuestionnaireQuestionChoiceFields';

@GraphqlType()
@DatabaseTable({ orderBy: { presentationOrder: 'ASC' } })
export default class SymptomQuestionnaireQuestionChoice extends SoftRemovableTimestampedEntity implements SymptomQuestionnaireQuestionChoiceFields {
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

  @ManyToOne('SymptomQuestionnaireQuestion', 'choices')
  question: SymptomQuestionnaireQuestionFields;

  @GraphqlField(() => Int)
  @DatabaseColumn('int')
  presentationOrder: number;
}
