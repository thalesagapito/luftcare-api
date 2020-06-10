import { Int, Field as GraphqlField, ObjectType as GraphqlType } from 'type-graphql';
import {
  OneToMany, ManyToOne, Entity as DatabaseTable, Column as DatabaseColumn,
} from 'typeorm';
import { SymptomAnalysisFormQuestionKind } from '@/enums';
import TimestampedEntity from '@/entities/extendable/TimestampedEntity';
import SymptomAnalysisFormFields from '@/interfaces/SymptomAnalysisFormFields';
import SymptomAnalysisFormQuestionChoice from '@/entities/SymptomAnalysisFormQuestionChoice';
import SymptomAnalysisFormQuestionFields from '@/interfaces/SymptomAnalysisFormQuestionFields';

@GraphqlType()
@DatabaseTable()
export default class SymptomAnalysisFormQuestion extends TimestampedEntity implements SymptomAnalysisFormQuestionFields {
  @GraphqlField({ description: 'Question name only for internal use. Only form-creator admins will see this.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  nameForManagement: string;

  @GraphqlField({ description: 'Question text, what will be shown to the user. Localization is not a concern.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  text: string;

  @GraphqlField(() => SymptomAnalysisFormQuestionKind)
  @DatabaseColumn({ type: 'enum', enum: SymptomAnalysisFormQuestionKind })
  kind: SymptomAnalysisFormQuestionKind;

  @ManyToOne('SymptomAnalysisForm', 'questions')
  form: SymptomAnalysisFormFields;

  @GraphqlField(() => [SymptomAnalysisFormQuestionChoice], { nullable: true })
  @OneToMany('SymptomAnalysisFormQuestionChoice', 'question', { cascade: true, nullable: false, eager: true })
  possibleChoices?: SymptomAnalysisFormQuestionChoice[];

  @GraphqlField(() => Int)
  @DatabaseColumn('int')
  presentationOrder: number;
}
