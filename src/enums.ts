import { registerEnumType } from 'type-graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  NON_ADMIN = 'NON_ADMIN'
}

export enum SymptomAnalysisFormQuestionKind {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FREE_RESPONSE = 'FREE_RESPONSE'
}

export enum OrderByClauseDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum OrderByClauseNullsPosition {
  NULLS_FIRST = 'NULLS FIRST',
  NULLS_LAST = 'NULLS LAST'
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(SymptomAnalysisFormQuestionKind, { name: 'SymptomAnalysisFormQuestionKind' });
registerEnumType(OrderByClauseDirection, { name: 'OrderByClauseDirection' });
registerEnumType(OrderByClauseNullsPosition, { name: 'OrderByClauseNullsPosition' });
