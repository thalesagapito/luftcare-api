import { SymptomQuestionnaireQuestionKind } from '@/enums';

export default interface SymptomQuestionnaireQuestionFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  nameForManagement: string;
  text: string;
  kind: SymptomQuestionnaireQuestionKind;
  presentationOrder: number;
}
