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
import { QuestionnaireScoreRangeColor } from '@/enums';
import Questionnaire from '@/entities/Questionnaire';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';
import QuestionnaireScoreRangeFields from '@/interfaces/QuestionnaireScoreRangeFields';

@GraphqlType()
@DatabaseTable()
export default class QuestionnaireScoreRange extends SoftRemovableTimestampedEntity implements QuestionnaireScoreRangeFields {
  @GraphqlField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @GraphqlField(() => require('./Questionnaire').default)
  @ManyToOne('Questionnaire', 'scoreRanges', { nullable: false, eager: false })
  questionnaire: Questionnaire;

  @GraphqlField(() => Int, { description: 'Minimum score value in order for response to be included in this range.' })
  @DatabaseColumn({ type: 'int' })
  minScore: number;

  @GraphqlField(() => Int, { description: 'Maximum score value in order for response to be included in this range.' })
  @DatabaseColumn({ type: 'int' })
  maxScore: number;

  @GraphqlField(() => QuestionnaireScoreRangeColor)
  @DatabaseColumn({ type: 'enum', enum: QuestionnaireScoreRangeColor })
  color: QuestionnaireScoreRangeColor;

  @GraphqlField(() => String, { description: 'Title of this range to be shown to users. Could be "Good", "Bad", etc.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  title: string;

  @GraphqlField(() => String, { description: 'Description of this range to be shown to users.' })
  @DatabaseColumn({ type: 'varchar', length: 2000 })
  description: string;
}
