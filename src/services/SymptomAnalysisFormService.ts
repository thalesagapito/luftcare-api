import SymptomAnalysisForm from '@/entities/SymptomAnalysisForm';
import { ORMPagination } from '@/services/PaginationService';
import { FindManyOptions } from 'typeorm';
import { pickBy } from 'lodash';

export type GetSymptomAnalysisFormsArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  where?: FindManyOptions<SymptomAnalysisForm>['where'];
};

export async function findAndCountSymptomAnalysisForms(args: GetSymptomAnalysisFormsArgs): Promise<[SymptomAnalysisForm[], number]> {
  const { pagination, withDeleted, where } = args;
  return SymptomAnalysisForm.findAndCount({ ...pagination, withDeleted, where: pickBy(where, Boolean) });
}
