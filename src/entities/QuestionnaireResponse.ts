import {
  ID,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import User from '@/entities/User';
import ResponseScore from '@/entities/ResponseScore';
import Questionnaire from '@/entities/Questionnaire';
import QuestionnaireResponseAnswer from '@/entities/QuestionnaireResponseAnswer';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';
import QuestionnaireResponseFields from '@/interfaces/QuestionnaireResponseFields';

@GraphqlType()
@DatabaseTable()
export default class QuestionnaireResponse extends SoftRemovableTimestampedEntity implements QuestionnaireResponseFields {
  @GraphqlField(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @GraphqlField()
  @DatabaseColumn({ type: 'timestamptz' })
  responseDate: Date;

  @GraphqlField(() => require('./User').default)
  @ManyToOne('User', 'questionnaireResponses', { nullable: false, eager: true })
  patient: User;

  @GraphqlField(() => require('./Questionnaire').default)
  @ManyToOne('Questionnaire', 'responses', { nullable: false, eager: true })
  questionnaire: Questionnaire;

  @GraphqlField(() => require('./QuestionnaireResponseAnswer').default)
  @OneToMany('QuestionnaireResponseAnswer', 'response', { nullable: false, eager: true })
  questionAnswers: QuestionnaireResponseAnswer[];

  score: ResponseScore;
}
