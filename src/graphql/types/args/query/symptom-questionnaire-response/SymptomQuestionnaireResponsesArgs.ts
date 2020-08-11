import {
  Min, Max, IsDate, IsUUID,
} from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import Orderable from '@/graphql/types/args/query/reusable/orderable/Orderable';
import Paginatable from '@/graphql/types/args/query/reusable/paginatable/Paginatable';
import SymptomQuestionnaireResponseFields from '@/interfaces/SymptomQuestionnaireResponseFields';

@ArgsType()
export default class SymptomQuestionnaireResponsesArgs extends Orderable<SymptomQuestionnaireResponseFields> implements Paginatable {
  @Field({ nullable: true, description: 'Gets only responses submitted by this user' })
  @IsUUID()
  patientId: string;

  @Field({ nullable: true, description: 'Gets only responses with `responseDate` after this value' })
  @IsDate()
  responseDateAfter: Date;

  @Field({ nullable: true, description: 'Gets only responses with `responseDate` before this value' })
  @IsDate()
  responseDateBefore: Date;

  @Field({ defaultValue: false })
  withDeleted?: boolean;

  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  pageNumber: Paginatable['pageNumber'];

  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @Max(100)
  resultsPerPage: Paginatable['resultsPerPage'];
}
