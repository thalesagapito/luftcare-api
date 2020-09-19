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
import QuestionnaireResponse from '@/entities/QuestionnaireResponse';
import QuestionnaireQuestion from '@/entities/QuestionnaireQuestion';
import QuestionnaireQuestionChoice from '@/entities/QuestionnaireQuestionChoice';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';

@GraphqlType()
@DatabaseTable()
export default class QuestionnaireResponseAnswer extends SoftRemovableTimestampedEntity {
  @GraphqlField(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @GraphqlField(() => require('./QuestionnaireResponse').default)
  @ManyToOne('QuestionnaireResponse', 'answers', { nullable: false, cascade: ['insert'] })
  response: QuestionnaireResponse;

  @GraphqlField(() => require('./QuestionnaireQuestion').default)
  @ManyToOne('QuestionnaireQuestion', 'answers', { nullable: false, eager: true })
  question: QuestionnaireQuestion;

  @GraphqlField(() => require('./QuestionnaireQuestionChoice').default, { nullable: true })
  @ManyToOne('QuestionnaireQuestionChoice', 'answers', { nullable: true, eager: true })
  selectedChoice?: QuestionnaireQuestionChoice;


  @GraphqlField({ nullable: true })
  @DatabaseColumn({ type: 'varchar', length: 3000, nullable: true })
  writtenText?: string;
}
