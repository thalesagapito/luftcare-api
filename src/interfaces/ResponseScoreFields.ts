import { QuestionnaireScoreRangeColor } from '@/enums';

export default interface ResponseScoreFields {
  value: number;
  color: QuestionnaireScoreRangeColor;
  title: string;
  description: string;
}
