export default interface SymptomAnalysisFormFields {
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
