import {
  ID,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import { SymptomAnalysisFormQuestionKind } from '@/enums';
import SymptomAnalysisFormQuestionChoice from '@/entities/SymptomAnalysisFormQuestionChoice';
import SymptomAnalysisFormQuestionFields from '@/interfaces/SymptomAnalysisFormQuestionFields';

@GraphqlType()
@DatabaseTable()
export default class SymptomAnalysisFormQuestion extends BaseEntity implements SymptomAnalysisFormQuestionFields {
  @GraphqlField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @GraphqlField()
  @CreateDateColumn()
  createdAt: Date;

  @GraphqlField()
  @UpdateDateColumn()
  updatedAt: Date;

  @GraphqlField()
  @DeleteDateColumn()
  deletedAt: Date;

  @GraphqlField({ description: 'Question name, only for internal use. Only form-creator admins will see this.' })
  @DatabaseColumn({ type: 'varchar', length: 255 })
  name: string;

  @GraphqlField({ description: 'Question text, what will be shown to the user. Localization is not a concern.' })
  @DatabaseColumn({ type: 'varchar', length: 500 })
  text: string;

  @GraphqlField(() => SymptomAnalysisFormQuestionKind)
  @DatabaseColumn({ type: 'enum', enum: SymptomAnalysisFormQuestionKind })
  kind: SymptomAnalysisFormQuestionKind;

  @GraphqlField(() => [SymptomAnalysisFormQuestionChoice], { nullable: true })
  @OneToMany('SymptomAnalysisFormQuestionChoice', 'question')
  possibleChoices?: SymptomAnalysisFormQuestionChoice[];
}
