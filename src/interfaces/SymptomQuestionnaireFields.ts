export default interface SymptomQuestionnaireFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  nameForManagement: string;
  nameForPresentation: string;
  version: number;
  isPublished: boolean;
}
