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
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';
import SymptomQuestionnaireResponseAnswer from './SymptomQuestionnaireResponseAnswer';

@GraphqlType()
@DatabaseTable()
export default class SymptomQuestionnaireResponse extends SoftRemovableTimestampedEntity {
  @GraphqlField(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @GraphqlField()
  @DatabaseColumn({ type: 'timestamp' })
  responseDate: Date;

  @GraphqlField(() => require('./User').default)
  @ManyToOne('User', 'questionnaireResponses', { nullable: false, eager: true })
  patient: User;

  @GraphqlField(() => require('./SymptomQuestionnaire').default)
  @ManyToOne('SymptomQuestionnaire', 'responses', { nullable: false, eager: true })
  questionnaire: SymptomQuestionnaire;

  @GraphqlField(() => require('./SymptomQuestionnaireResponseAnswer').default)
  @OneToMany('SymptomQuestionnaireResponseAnswer', 'response', { nullable: false, eager: true })
  questionAnswers: SymptomQuestionnaireResponseAnswer[];
}
