import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { ORMPagination } from '@/services/PaginationService';
import { FindManyOptions, getConnection } from 'typeorm';
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

export async function getHighestVersionNumber(idSharedBetweenVersions: string): NullablePromise<number> {
  const { max } = await getConnection()
    .createQueryBuilder(SymptomQuestionnaire, 'q')
    .select('MAX(q.version)', 'max')
    .where('q.idSharedBetweenVersions = :idSharedBetweenVersions', { idSharedBetweenVersions })
    .getRawOne();

  return max || undefined;
}

export async function findQuestionnaireWithHighestVersion(idSharedBetweenVersions: string): NullablePromise<SymptomQuestionnaire> {
  return SymptomQuestionnaire.findOne({ where: { idSharedBetweenVersions }, order: { version: 'DESC' } });
}

export async function findQuestionnaireWithVersion(idSharedBetweenVersions: string, version: number): NullablePromise<SymptomQuestionnaire> {
  return SymptomQuestionnaire.findOne({ where: { idSharedBetweenVersions, version } });
}

export async function findQuestionnaireById(id: string): NullablePromise<SymptomQuestionnaire> {
  return SymptomQuestionnaire.findOne({ where: { id } });
}

export async function updateQuestionnairePublishStatus(questionnaire: SymptomQuestionnaire, isPublished: boolean) {
  const updatedQuestionnaire = SymptomQuestionnaire.merge(questionnaire, { isPublished });
  return SymptomQuestionnaire.save(updatedQuestionnaire);
}
