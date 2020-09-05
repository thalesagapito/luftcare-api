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
import SymptomQuestionnaireFields from '@/interfaces/SymptomQuestionnaireFields';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import SymptomQuestionnaireScoreRange from '@/entities/SymptomQuestionnaireScoreRange';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';

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

  @GraphqlField(() => [require('./SymptomQuestionnaireQuestion').default])
  @OneToMany('SymptomQuestionnaireQuestion', 'questionnaire', { eager: true })
  questions: SymptomQuestionnaireQuestion[];

  @GraphqlField(() => [require('./SymptomQuestionnaireResponse').default])
  @OneToMany('SymptomQuestionnaireResponse', 'questionnaire')
  responses: SymptomQuestionnaireResponse[];

  @GraphqlField(() => [require('./SymptomQuestionnaireScoreRange').default])
  @OneToMany('SymptomQuestionnaireScoreRange', 'questionnaire', { eager: true })
  scoreRanges: SymptomQuestionnaireScoreRange[];
}
