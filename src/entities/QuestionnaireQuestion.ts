import {
  ID,
  Int,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import { QuestionnaireQuestionKind } from '@/enums';
import QuestionnaireFields from '@/interfaces/QuestionnaireFields';
import QuestionnaireQuestionChoice from '@/entities/QuestionnaireQuestionChoice';
import QuestionnaireQuestionFields from '@/interfaces/QuestionnaireQuestionFields';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';

@GraphqlType()
@DatabaseTable({ orderBy: { presentationOrder: 'ASC' } })
export default class QuestionnaireQuestion extends SoftRemovableTimestampedEntity implements QuestionnaireQuestionFields {
  @GraphqlField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @GraphqlField({ description: 'Question name only for internal use. Only admins will see this.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  nameForManagement: string;

  @GraphqlField({ description: 'Question text, what will be shown to the user. Localization is not a concern.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  text: string;

  @GraphqlField(() => QuestionnaireQuestionKind)
  @DatabaseColumn({ type: 'enum', enum: QuestionnaireQuestionKind })
  kind: QuestionnaireQuestionKind;

  @ManyToOne('Questionnaire', 'questions', { nullable: false })
  questionnaire: QuestionnaireFields;

  @GraphqlField(() => [QuestionnaireQuestionChoice], { nullable: true })
  @OneToMany('QuestionnaireQuestionChoice', 'question', { nullable: false, eager: true })
  possibleChoices?: QuestionnaireQuestionChoice[];

  @GraphqlField(() => Int)
  @DatabaseColumn('int')
  presentationOrder: number;
}
