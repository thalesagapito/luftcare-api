import {
  Int, Field as GraphqlField, ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany, VersionColumn, Entity as DatabaseTable, Column as DatabaseColumn, PrimaryColumn,
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
  @PrimaryColumn()
  version: number;

  @GraphqlField()
  @DatabaseColumn({ type: 'boolean' })
  isPublished: boolean;

  @GraphqlField(() => [SymptomQuestionnaireQuestion], { nullable: true })
  @OneToMany('SymptomQuestionnaireQuestion', 'questionnaire', { cascade: true, nullable: false, eager: true })
  questions: SymptomQuestionnaireQuestion[];
}
