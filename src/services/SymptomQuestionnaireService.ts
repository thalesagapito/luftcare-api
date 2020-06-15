import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { ORMPagination } from '@/services/PaginationService';
import { FindManyOptions, getConnection } from 'typeorm';
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

export async function getHighestVersionNumber(id: string): Promise<number> {
  const { max } = await getConnection()
    .createQueryBuilder(SymptomQuestionnaire, 'q')
    .select('MAX(q.version)', 'max')
    .where('q.id = :id', { id })
    .orderBy('max')
    .getRawOne();

  return max;
}