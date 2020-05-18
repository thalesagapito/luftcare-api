import {
  ID,
  Int,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany,
  BaseEntity,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import SymptomAnalysisFormFields from '@/interfaces/SymptomAnalysisFormFields';
import SymptomAnalysisFormQuestion from '@/entities/SymptomAnalysisFormQuestion';

@GraphqlType()
@DatabaseTable()
export default class SymptomAnalysisForm extends BaseEntity implements SymptomAnalysisFormFields {
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

  @GraphqlField()
  @DatabaseColumn({ type: 'varchar', length: 255 })
  name: string;

  @GraphqlField(() => Int)
  @VersionColumn()
  version: number;

  @GraphqlField(() => ID,
    {
      nullable: true,
      description: 'If the form is an older version kept only to prevent integrity problems'
      + ' this field will contain the id of the current form with the highest version',
    })
  @DatabaseColumn({ type: 'uuid', nullable: true })
  idOfCurrentVersion?: string;

  @GraphqlField()
  @DatabaseColumn({ type: 'boolean' })
  isPublished: boolean;

  @GraphqlField(() => [SymptomAnalysisFormQuestion], { nullable: true })
  @OneToMany('SymptomAnalysisFormQuestion', 'form', { cascade: true, nullable: false })
  questions: SymptomAnalysisFormQuestion[];
  /*
  how to version
  1. create form with auto id, idOfCurrentVersion = null, version = 1
  2. on update form, get currentForm and save it with a new autoId and idOfCurrentVersion = original form id, \
  everything else is the same as the current form (should also update the form id on all questions)
  3. update the current form, which will increase its version but keep the id, then create new questions \
  referencing this new form
  WARNING: PREVENT ANY UPDATE ON FORMS WITH ID_OF_CURRENT_VERSION != NULL
  */
}
