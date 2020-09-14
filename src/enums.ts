import { registerEnumType } from 'type-graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

export enum SymptomQuestionnaireQuestionKind {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FREE_RESPONSE = 'FREE_RESPONSE',
}

export enum OrderByClauseDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum OrderByClauseNullsPosition {
  NULLS_FIRST = 'NULLS FIRST',
  NULLS_LAST = 'NULLS LAST',
}

export enum SymptomQuestionnaireScoreRangeColor {
  GREEN = 'GREEN',
  GREEN_YELLOW = 'GREEN_YELLOW',
  YELLOW = 'YELLOW',
  ORANGE = 'ORANGE',
  RED = 'RED',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(SymptomQuestionnaireQuestionKind, { name: 'SymptomQuestionnaireQuestionKind' });
registerEnumType(OrderByClauseDirection, { name: 'OrderByClauseDirection' });
registerEnumType(OrderByClauseNullsPosition, { name: 'OrderByClauseNullsPosition' });
registerEnumType(SymptomQuestionnaireScoreRangeColor, { name: 'SymptomQuestionnaireScoreRangeColor' });
