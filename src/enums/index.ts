import { registerEnumType } from 'type-graphql';

export enum UserRole { ADMIN, NON_ADMIN }
export enum SymptomAnalysisFormQuestionKind { MULTIPLE_CHOICE, FREE_RESPONSE }

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(SymptomAnalysisFormQuestionKind, { name: 'SymptomAnalysisFormQuestionKind' });
