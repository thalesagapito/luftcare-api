import { registerEnumType } from 'type-graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  NON_ADMIN = 'NON_ADMIN'
}
export enum SymptomAnalysisFormQuestionKind {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FREE_RESPONSE = 'FREE_RESPONSE'
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(SymptomAnalysisFormQuestionKind, { name: 'SymptomAnalysisFormQuestionKind' });
