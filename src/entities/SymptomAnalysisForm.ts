import {
  ID, Int, Field as GraphqlField, ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany, VersionColumn, Entity as DatabaseTable, Column as DatabaseColumn,
} from 'typeorm';
import TimestampedEntity from '@/entities/extendable/TimestampedEntity';
import SymptomAnalysisFormFields from '@/interfaces/SymptomAnalysisFormFields';
import SymptomAnalysisFormQuestion from '@/entities/SymptomAnalysisFormQuestion';

@GraphqlType()
@DatabaseTable({
  orderBy: { updatedAt: { order: 'DESC', nulls: 'NULLS LAST' } },
})
export default class SymptomAnalysisForm extends TimestampedEntity implements SymptomAnalysisFormFields {
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
  @OneToMany('SymptomAnalysisFormQuestion', 'form', { cascade: true, nullable: false, eager: true })
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
