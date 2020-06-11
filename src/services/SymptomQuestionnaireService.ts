import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { ORMPagination } from '@/services/PaginationService';
import { FindManyOptions } from 'typeorm';
import { pickBy } from 'lodash';

export type GetSymptomQuestionnairesArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  where?: FindManyOptions<SymptomQuestionnaire>['where'];
};

export async function findAndCountSymptomQuestionnaires(args: GetSymptomQuestionnairesArgs): Promise<[SymptomQuestionnaire[], number]> {
  const { pagination, withDeleted, where } = args;
  return SymptomQuestionnaire.findAndCount({ ...pagination, withDeleted, where: pickBy(where, Boolean) });
}
