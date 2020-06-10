export default interface SymptomAnalysisQuestionnaireFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  nameForManagement: string;
  nameForPresentation: string;
  version: number;
  idOfCurrentVersion?: string;
  isPublished: boolean;
}
