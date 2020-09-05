import { SymptomQuestionnaireScoreRangeColor } from '@/enums';

export default interface SymptomQuestionnaireScoreRangeFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  minScore: number;
  maxScore: number;
  color: SymptomQuestionnaireScoreRangeColor;
  title: string;
  description: string;
}
