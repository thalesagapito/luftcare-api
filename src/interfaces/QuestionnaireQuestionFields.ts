import { QuestionnaireQuestionKind } from '@/enums';

export default interface QuestionnaireQuestionFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  nameForManagement: string;
  text: string;
  kind: QuestionnaireQuestionKind;
  presentationOrder: number;
}
