import { SymptomAnalysisQuestionnaireQuestionKind } from '@/enums';

export default interface SymptomAnalysisQuestionnaireQuestionFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  nameForManagement: string;
  text: string;
  kind: SymptomAnalysisQuestionnaireQuestionKind;
  presentationOrder: number;
}
