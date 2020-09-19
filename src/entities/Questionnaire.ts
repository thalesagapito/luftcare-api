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
import QuestionnaireFields from '@/interfaces/QuestionnaireFields';
import QuestionnaireQuestion from '@/entities/QuestionnaireQuestion';
import QuestionnaireResponse from '@/entities/QuestionnaireResponse';
import QuestionnaireScoreRange from '@/entities/QuestionnaireScoreRange';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';

@GraphqlType()
@DatabaseTable()
export default class Questionnaire extends SoftRemovableTimestampedEntity implements QuestionnaireFields {
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

  @GraphqlField(() => [require('./QuestionnaireQuestion').default])
  @OneToMany('QuestionnaireQuestion', 'questionnaire', { eager: true })
  questions: QuestionnaireQuestion[];

  @GraphqlField(() => [require('./QuestionnaireResponse').default])
  @OneToMany('QuestionnaireResponse', 'questionnaire')
  responses: QuestionnaireResponse[];

  @GraphqlField(() => [require('./QuestionnaireScoreRange').default])
  @OneToMany('QuestionnaireScoreRange', 'questionnaire', { eager: true })
  scoreRanges: QuestionnaireScoreRange[];
}
