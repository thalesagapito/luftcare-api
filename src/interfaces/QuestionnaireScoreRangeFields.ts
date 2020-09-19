import { QuestionnaireScoreRangeColor } from '@/enums';

export default interface QuestionnaireScoreRangeFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  minScore: number;
  maxScore: number;
  color: QuestionnaireScoreRangeColor;
  title: string;
  description: string;
}
