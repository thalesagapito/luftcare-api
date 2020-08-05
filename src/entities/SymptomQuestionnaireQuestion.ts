import {
  ID,
  Int,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import { SymptomQuestionnaireQuestionKind } from '@/enums';
import SymptomQuestionnaireFields from '@/interfaces/SymptomQuestionnaireFields';
import SymptomQuestionnaireQuestionChoice from '@/entities/SymptomQuestionnaireQuestionChoice';
import SymptomQuestionnaireQuestionFields from '@/interfaces/SymptomQuestionnaireQuestionFields';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';

@GraphqlType()
@DatabaseTable()
export default class SymptomQuestionnaireQuestion extends SoftRemovableTimestampedEntity implements SymptomQuestionnaireQuestionFields {
  @GraphqlField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @GraphqlField({ description: 'Question name only for internal use. Only admins will see this.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  nameForManagement: string;

  @GraphqlField({ description: 'Question text, what will be shown to the user. Localization is not a concern.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  text: string;

  @GraphqlField(() => SymptomQuestionnaireQuestionKind)
  @DatabaseColumn({ type: 'enum', enum: SymptomQuestionnaireQuestionKind })
  kind: SymptomQuestionnaireQuestionKind;

  @ManyToOne('SymptomQuestionnaire', 'questions', { nullable: false })
  questionnaire: SymptomQuestionnaireFields;

  @GraphqlField(() => [SymptomQuestionnaireQuestionChoice], { nullable: true })
  @OneToMany('SymptomQuestionnaireQuestionChoice', 'question', { nullable: false, eager: true })
  possibleChoices?: SymptomQuestionnaireQuestionChoice[];

  @GraphqlField(() => Int)
  @DatabaseColumn('int')
  presentationOrder: number;
}
