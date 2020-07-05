import {
  ID,
  Int,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany,
  PrimaryColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';
import SymptomQuestionnaireFields from '@/interfaces/SymptomQuestionnaireFields';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';

@GraphqlType()
@DatabaseTable()
export default class SymptomQuestionnaire extends SoftRemovableTimestampedEntity implements SymptomQuestionnaireFields {
  @GraphqlField(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @GraphqlField()
  @DatabaseColumn({ type: 'varchar', length: 500 })
  nameForManagement: string;

  @GraphqlField()
  @DatabaseColumn({ type: 'varchar', length: 500 })
  nameForPresentation: string;

  @GraphqlField(() => Int)
  @PrimaryColumn({ type: 'int' })
  version: number;

  @GraphqlField()
  @DatabaseColumn({ type: 'boolean' })
  isPublished: boolean;

  @GraphqlField(() => [SymptomQuestionnaireQuestion])
  @OneToMany('SymptomQuestionnaireQuestion', 'questionnaire', { cascade: true, nullable: false, eager: true })
  questions: SymptomQuestionnaireQuestion[];
}
