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
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import SymptomQuestionnaireResponseAnswer from '@/entities/SymptomQuestionnaireResponseAnswer';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';
import SymptomQuestionnaireResponseFields from '@/interfaces/SymptomQuestionnaireResponseFields';

@GraphqlType()
@DatabaseTable()
export default class SymptomQuestionnaireResponse extends SoftRemovableTimestampedEntity implements SymptomQuestionnaireResponseFields {
  @GraphqlField(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @GraphqlField()
  @DatabaseColumn({ type: 'timestamptz' })
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

  score: ResponseScore;
}
