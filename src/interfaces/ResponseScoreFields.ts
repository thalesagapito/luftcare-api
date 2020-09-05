import { SymptomQuestionnaireScoreRangeColor } from '@/enums';

export default interface ResponseScoreFields {
  value: number;
  color: SymptomQuestionnaireScoreRangeColor;
  title: string;
  description: string;
}
