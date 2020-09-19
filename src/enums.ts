import { registerEnumType } from 'type-graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

export enum QuestionnaireQuestionKind {
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

export enum QuestionnaireScoreRangeColor {
  GREEN = 'GREEN',
  GREEN_YELLOW = 'GREEN_YELLOW',
  YELLOW = 'YELLOW',
  ORANGE = 'ORANGE',
  RED = 'RED',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(QuestionnaireQuestionKind, { name: 'QuestionnaireQuestionKind' });
registerEnumType(OrderByClauseDirection, { name: 'OrderByClauseDirection' });
registerEnumType(OrderByClauseNullsPosition, { name: 'OrderByClauseNullsPosition' });
registerEnumType(QuestionnaireScoreRangeColor, { name: 'QuestionnaireScoreRangeColor' });
