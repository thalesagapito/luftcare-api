import {
  ManyToOne,
  PrimaryColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import {
  ID,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';
import SymptomQuestionnaireQuestionChoice from '@/entities/SymptomQuestionnaireQuestionChoice';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';

@GraphqlType()
@DatabaseTable()
export default class SymptomQuestionnaireResponseAnswer extends SoftRemovableTimestampedEntity {
  @GraphqlField(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @GraphqlField(() => require('./SymptomQuestionnaireResponse').default)
  @ManyToOne('SymptomQuestionnaireResponse', 'answers', { nullable: false, cascade: ['insert'] })
  response: SymptomQuestionnaireResponse;

  @GraphqlField(() => require('./SymptomQuestionnaireQuestion').default)
  @ManyToOne('SymptomQuestionnaireQuestion', 'answers', { nullable: false, eager: true })
  question: SymptomQuestionnaireQuestion;

  @GraphqlField(() => require('./SymptomQuestionnaireQuestionChoice').default)
  @ManyToOne('SymptomQuestionnaireQuestionChoice', 'answers', { nullable: true, eager: true })
  selectedChoice?: SymptomQuestionnaireQuestionChoice;


  @GraphqlField()
  @DatabaseColumn({ type: 'varchar', length: 3000, nullable: true })
  writtenText?: string;
}
