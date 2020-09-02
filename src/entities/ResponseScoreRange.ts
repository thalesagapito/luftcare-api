import {
  ID,
  Int,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  ManyToOne,
  PrimaryColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';
import ResponseScoreRangeFields from '@/interfaces/ResponseScoreRangeFields';
import { ResponseScoreRangeColor } from '@/enums';

@GraphqlType()
@DatabaseTable()
export default class ResponseScoreRange extends SoftRemovableTimestampedEntity implements ResponseScoreRangeFields {
  @GraphqlField(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @GraphqlField(() => require('./SymptomQuestionnaire').default)
  @ManyToOne('SymptomQuestionnaire', 'scoreRanges', { nullable: false, eager: false })
  questionnaire: SymptomQuestionnaire;

  @GraphqlField(() => Int, { description: 'Minimum score value in order for response to be included in this range.' })
  @DatabaseColumn({ type: 'int' })
  minScore: number;

  @GraphqlField(() => Int, { description: 'Maximum score value in order for response to be included in this range.' })
  @DatabaseColumn({ type: 'int' })
  maxScore: number;

  @GraphqlField(() => ResponseScoreRangeColor)
  @DatabaseColumn({ type: 'enum', enum: ResponseScoreRangeColor })
  color: ResponseScoreRangeColor;

  @GraphqlField(() => String, { description: 'Title of this range to be shown to users. Could be "Good", "Bad", etc.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  title: string;


  @GraphqlField(() => String, { description: 'Description of this range to be shown to users.' })
  @DatabaseColumn({ type: 'varchar', length: 2000 })
  description: string;
}
