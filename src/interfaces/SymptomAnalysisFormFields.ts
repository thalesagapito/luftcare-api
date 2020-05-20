export default interface SymptomAnalysisFormFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  name: string;
  version: number;
  idOfCurrentVersion?: string;
  isPublished: boolean;
}
