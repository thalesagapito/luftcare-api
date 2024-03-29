import {
  Int,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import { QuestionnaireScoreRangeColor } from '@/enums';
import ResponseScoreFields from '@/interfaces/ResponseScoreFields';

@GraphqlType()
export default class ResponseScore implements ResponseScoreFields {
  @GraphqlField(() => Int, { description: 'Numerical value.' })
  value: number;

  @GraphqlField(() => QuestionnaireScoreRangeColor)
  color: QuestionnaireScoreRangeColor;

  @GraphqlField(() => String, { description: 'Title of this range to be shown to users. Could be "Good", "Bad", etc.' })
  title: string;

  @GraphqlField(() => String, { description: 'Description of this range to be shown to users.' })
  description: string;
}
