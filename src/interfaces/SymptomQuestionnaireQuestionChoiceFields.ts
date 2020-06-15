export default interface SymptomQuestionnaireQuestionChoiceFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  nameForManagement: string;
  text: string;
  value: number;
  presentationOrder: number;
}
