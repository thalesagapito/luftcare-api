import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { ORMPagination } from '@/services/PaginationService';
import { FindManyOptions, getConnection, Brackets } from 'typeorm';
import { pickBy } from 'lodash';
import { NullablePromise } from '@/helper-types';

export type GetSymptomQuestionnairesArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  where?: FindManyOptions<SymptomQuestionnaire>['where'];
};

export async function findAndCountSymptomQuestionnaires(args: GetSymptomQuestionnairesArgs): Promise<[SymptomQuestionnaire[], number]> {
  const { pagination, withDeleted, where } = args;
  return SymptomQuestionnaire.findAndCount({ ...pagination, withDeleted, where: pickBy(where, Boolean) });
}

export async function getHighestVersionNumber(id: string): NullablePromise<number> {
  const { max } = await getConnection()
    .createQueryBuilder(SymptomQuestionnaire, 'q')
    .select('MAX(q.version)', 'max')
    .where('q.idSharedBetweenVersions = :id', { id })
    .getRawOne();

  return max || undefined;
}

export async function findQuestionnaireWithHighestVersion(idSharedBetweenVersions: string): NullablePromise<SymptomQuestionnaire> {
  return SymptomQuestionnaire.findOne({ where: { idSharedBetweenVersions }, order: { version: 'DESC' } });
}

export async function findQuestionnaireById(id: string): NullablePromise<SymptomQuestionnaire> {
  return SymptomQuestionnaire.findOne({ where: { id } });
}

export async function updateQuestionnairePublishStatus(
  isPublished: boolean,
  idSharedBetweenVersions: string,
  highestVersionNumber: number,
) {
  return getConnection()
    .createQueryBuilder()
    .update(SymptomQuestionnaire)
    .set({ isPublished })
    .where('idSharedBetweenVersions = :idSharedBetweenVersions', { idSharedBetweenVersions })
    .andWhere(new Brackets((qb) => qb
      .where('version = :zero', { zero: 0 })
      .orWhere('version = :highestVersionNumber', { highestVersionNumber })))
    .execute();
}
