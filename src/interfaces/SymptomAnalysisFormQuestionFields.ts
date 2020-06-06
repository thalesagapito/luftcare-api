import { SymptomAnalysisFormQuestionKind } from '@/enums';

export default interface SymptomAnalysisFormQuestionFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  nameForManagement: string;
  text: string;
  kind: SymptomAnalysisFormQuestionKind;
  presentationOrder: number;
}
