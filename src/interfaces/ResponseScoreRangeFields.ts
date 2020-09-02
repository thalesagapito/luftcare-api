import { ResponseScoreRangeColor } from '@/enums';

export default interface ResponseScoreRangeFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  minScore: number;
  maxScore: number;
  color: ResponseScoreRangeColor;
  title: string;
  description: string;
}
