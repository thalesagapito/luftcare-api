import { updateQuestionnairePublishStatus, findQuestionnaireWithHighestVersion } from '@/services/SymptomQuestionnaireService';
import { GenericUseCaseResponse } from '@/helper-types';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';
const ALREADY_PUBLISHED = 'O questionário já está público';
const ALREADY_UNPUBLISHED = 'O questionário já está privado';

const PUBLISH_SUCCESS_MESSAGE = 'Questionário publicado com sucesso';
const UNPUBLISH_SUCCESS_MESSAGE = 'Questionário tornado privado com sucesso';

export default async function (id: string, isPublished: boolean): Promise<GenericUseCaseResponse> {
  const currentQuestionnaire = await findQuestionnaireWithHighestVersion(id);
  if (!currentQuestionnaire) throw new Error(NOT_FOUND_ERROR);

  const { isPublished: currentIsPublished } = currentQuestionnaire;
  const isAlreadyPublished = isPublished === currentIsPublished && isPublished;
  const isAlreadyUnpublished = isPublished === currentIsPublished && !isPublished;
  if (isAlreadyPublished) throw new Error(ALREADY_PUBLISHED);
  if (isAlreadyUnpublished) throw new Error(ALREADY_UNPUBLISHED);

  await updateQuestionnairePublishStatus(currentQuestionnaire, isPublished);

  return { userFriendlyMessage: isPublished ? PUBLISH_SUCCESS_MESSAGE : UNPUBLISH_SUCCESS_MESSAGE };
}
