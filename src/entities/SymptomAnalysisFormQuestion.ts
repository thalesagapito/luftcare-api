import { Int, Field as GraphqlField, ObjectType as GraphqlType } from 'type-graphql';
import {
  OneToMany, ManyToOne, Entity as DatabaseTable, Column as DatabaseColumn,
} from 'typeorm';
import { SymptomAnalysisQuestionnaireQuestionKind } from '@/enums';
import TimestampedEntity from '@/entities/extendable/TimestampedEntity';
import SymptomAnalysisQuestionnaireFields from '@/interfaces/SymptomAnalysisQuestionnaireFields';
import SymptomAnalysisQuestionnaireQuestionChoice from '@/entities/SymptomAnalysisQuestionnaireQuestionChoice';
import SymptomAnalysisQuestionnaireQuestionFields from '@/interfaces/SymptomAnalysisQuestionnaireQuestionFields';

@GraphqlType()
@DatabaseTable()
export default class SymptomAnalysisQuestionnaireQuestion extends TimestampedEntity implements SymptomAnalysisQuestionnaireQuestionFields {
  @GraphqlField({ description: 'Question name only for internal use. Only questionnaire-creator admins will see this.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  nameForManagement: string;

  @GraphqlField({ description: 'Question text, what will be shown to the user. Localization is not a concern.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  text: string;

  @GraphqlField(() => SymptomAnalysisQuestionnaireQuestionKind)
  @DatabaseColumn({ type: 'enum', enum: SymptomAnalysisQuestionnaireQuestionKind })
  kind: SymptomAnalysisQuestionnaireQuestionKind;

  @ManyToOne('SymptomAnalysisQuestionnaire', 'questions')
  questionnaire: SymptomAnalysisQuestionnaireFields;

  @GraphqlField(() => [SymptomAnalysisQuestionnaireQuestionChoice], { nullable: true })
  @OneToMany('SymptomAnalysisQuestionnaireQuestionChoice', 'question', { cascade: true, nullable: false, eager: true })
  possibleChoices?: SymptomAnalysisQuestionnaireQuestionChoice[];

  @GraphqlField(() => Int)
  @DatabaseColumn('int')
  presentationOrder: number;
}
