import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { ORMPagination } from '@/services/PaginationService';
import { FindManyOptions, getConnection } from 'typeorm';
import { pickBy } from 'lodash';
import { NullablePromise } from '@/helper-types';
import { QuestionnaireSubscriberData } from '@/subscribers/SymptomQuestionnaireSubscriber';

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
    .where('q.id = :id', { id })
    .getRawOne();

  return max || undefined;
}

export async function findQuestionnaireWithHighestVersion(id: string, withDeleted = false) {
  return SymptomQuestionnaire.findOne({ where: { id }, order: { version: 'DESC' }, withDeleted });
}

export async function findQuestionnaireByIdAndVersion(id: string, version: number): NullablePromise<SymptomQuestionnaire> {
  return SymptomQuestionnaire.findOne({ where: { id, version } });
}

export async function updateQuestionnairePublishStatus(questionnaire: SymptomQuestionnaire, isPublished: boolean) {
  const updatedFields = { isPublished };
  const data: QuestionnaireSubscriberData = { updatedFields, eventKind: 'update' };
  const updatedQuestionnaire = SymptomQuestionnaire.merge(questionnaire, updatedFields);
  return SymptomQuestionnaire.save(updatedQuestionnaire, { data });
}

export async function softRemoveQuestionnaire(questionnaire: SymptomQuestionnaire) {
  const data: QuestionnaireSubscriberData = { eventKind: 'softRemove' };
  return SymptomQuestionnaire.getRepository().softRemove(questionnaire, { data });
}

export async function recoverQuestionnaire(questionnaire: SymptomQuestionnaire) {
  const data: QuestionnaireSubscriberData = { eventKind: 'recover' };
  return SymptomQuestionnaire.getRepository().recover(questionnaire, { data });
}
