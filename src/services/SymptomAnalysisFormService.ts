import SymptomAnalysisQuestionnaire from '@/entities/SymptomAnalysisQuestionnaire';
import { ORMPagination } from '@/services/PaginationService';
import { FindManyOptions } from 'typeorm';
import { pickBy } from 'lodash';

export type GetSymptomAnalysisQuestionnairesArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  where?: FindManyOptions<SymptomAnalysisQuestionnaire>['where'];
};

export async function findAndCountSymptomAnalysisQuestionnaires(args: GetSymptomAnalysisQuestionnairesArgs): Promise<[SymptomAnalysisQuestionnaire[], number]> {
  const { pagination, withDeleted, where } = args;
  return SymptomAnalysisQuestionnaire.findAndCount({ ...pagination, withDeleted, where: pickBy(where, Boolean) });
}
