import { ResponseScoreRangeColor } from '@/enums';

export default interface ResponseScoreFields {
  value: number;
  color: ResponseScoreRangeColor;
  title: string;
  description: string;
}
