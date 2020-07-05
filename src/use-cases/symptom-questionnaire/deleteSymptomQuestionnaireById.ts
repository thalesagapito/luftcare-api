import { GenericUseCaseResponse } from '@/helper-types';
import { findQuestionnaireWithHighestVersion, softRemoveQuestionnaire } from '@/services/SymptomQuestionnaireService';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';
const ALREADY_DELETED_ERROR = 'O questionário já foi removido';
const SUCCESS_MESSAGE = 'Questionário removido com sucesso';

export default async function (id: string): Promise<GenericUseCaseResponse> {
  const questionnaireWithHighestVersion = await findQuestionnaireWithHighestVersion(id, true);
  if (!questionnaireWithHighestVersion) throw new Error(NOT_FOUND_ERROR);
  if (questionnaireWithHighestVersion.deletedAt) throw new Error(ALREADY_DELETED_ERROR);

  await softRemoveQuestionnaire(questionnaireWithHighestVersion);

  return { userFriendlyMessage: SUCCESS_MESSAGE };
}
