import {
  ID, Int, Field as GraphqlField, ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany, VersionColumn, Entity as DatabaseTable, Column as DatabaseColumn,
} from 'typeorm';
import TimestampedEntity from '@/entities/extendable/TimestampedEntity';
import SymptomQuestionnaireFields from '@/interfaces/SymptomQuestionnaireFields';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';

@GraphqlType()
@DatabaseTable(
  {
    orderBy:
      {
        updatedAt:
         {
           order: 'DESC',
           nulls: 'NULLS LAST',
         },
      },
  },
)
export default class SymptomQuestionnaire extends TimestampedEntity implements SymptomQuestionnaireFields {
  @GraphqlField()
  @DatabaseColumn({ type: 'varchar', length: 500 })
  nameForManagement: string;

  @GraphqlField()
  @DatabaseColumn({ type: 'varchar', length: 500 })
  nameForPresentation: string;

  @GraphqlField(() => Int)
  @VersionColumn()
  version: number;

  @GraphqlField(() => ID,
    {
      nullable: true,
      description: 'If the questionnaire is an older version kept only to prevent integrity problems'
      + ' this field will contain the id of the current questionnaire with the highest version',
    })
  @DatabaseColumn({ type: 'uuid', nullable: true })
  idOfCurrentVersion?: string;

  @GraphqlField()
  @DatabaseColumn({ type: 'boolean' })
  isPublished: boolean;

  @GraphqlField(() => [SymptomQuestionnaireQuestion], { nullable: true })
  @OneToMany('SymptomQuestionnaireQuestion', 'questionnaire', { cascade: true, nullable: false, eager: true })
  questions: SymptomQuestionnaireQuestion[];
  /*
  how to version
  1. create questionnaire with auto id, idOfCurrentVersion = null, version = 1
  2. on update questionnaire, get currentQuestionnaire and save it with a new autoId and idOfCurrentVersion = original questionnaire id, \
  everything else is the same as the current questionnaire (should also update the questionnaire id on all questions)
  3. update the current questionnaire, which will increase its version but keep the id, then create new questions \
  referencing this new questionnaire
  WARNING: PREVENT ANY UPDATE ON FORMS WITH ID_OF_CURRENT_VERSION != NULL
  */
}
