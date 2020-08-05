import { GenericUseCaseResponse } from '@/helper-types';
import { softRemoveQuestionnaires } from '@/services/SymptomQuestionnaireService';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';
const ALREADY_DELETED_ERROR = 'O questionário já foi removido';
const SUCCESS_MESSAGE = 'Questionário removido com sucesso';

export default async function (id: string): Promise<GenericUseCaseResponse> {
  const questionnaireVersions = await SymptomQuestionnaire.find({ withDeleted: true, where: { id } });

  if (questionnaireVersions.length === 0) throw new Error(NOT_FOUND_ERROR);
  if (questionnaireVersions.some(({ deletedAt }) => deletedAt)) throw new Error(ALREADY_DELETED_ERROR);

  await softRemoveQuestionnaires(questionnaireVersions);

  return { userFriendlyMessage: SUCCESS_MESSAGE };
}