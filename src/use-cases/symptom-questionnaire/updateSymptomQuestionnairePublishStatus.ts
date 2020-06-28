import { findQuestionnaireById, updateQuestionnairePublishStatus, findQuestionnaireWithHighestVersion } from '@/services/SymptomQuestionnaireService';
import { GenericUseCaseResponse } from '@/helper-types';

const UNKNOWN_ERROR = 'Ocorreu um erro ao alterar o questionário';
const NOT_FOUND_ERROR = 'Nenhum questionário encontrado com o id recebido';
const ID_NOT_FROM_CURRENT_VERSION_ERROR = 'O id recebido não pertence a um questionário atual';
const ALREADY_PUBLISHED = 'O questionário já está público';
const ALREADY_UNPUBLISHED = 'O questionário já está privado';

const SUCCESS_MESSAGE = 'Questionário alterado com sucesso';

export default async function (id: string, isPublished: boolean): Promise<GenericUseCaseResponse> {
  const questionnaireWithIdFromArgs = await findQuestionnaireById(id);
  if (!questionnaireWithIdFromArgs) throw new Error(NOT_FOUND_ERROR);

  const { idSharedBetweenVersions } = questionnaireWithIdFromArgs;
  const questionnaireWithHighestVersion = await findQuestionnaireWithHighestVersion(idSharedBetweenVersions);
  if (!questionnaireWithHighestVersion) throw new Error(NOT_FOUND_ERROR);

  const { version: highestVersionNumber } = questionnaireWithHighestVersion;
  const { version: versionOfQuestionnaireFromArgs } = questionnaireWithIdFromArgs;

  const isQuestionnaireFromArgsCurrent = versionOfQuestionnaireFromArgs === 0
                                      || versionOfQuestionnaireFromArgs === highestVersionNumber;
  if (!isQuestionnaireFromArgsCurrent) throw new Error(ID_NOT_FROM_CURRENT_VERSION_ERROR);

  const { isPublished: currentIsPublished } = questionnaireWithHighestVersion;
  const isAlreadyPublished = isPublished === currentIsPublished && isPublished;
  const isAlreadyUnpublished = isPublished === currentIsPublished && !isPublished;
  if (isAlreadyPublished) throw new Error(ALREADY_PUBLISHED);
  if (isAlreadyUnpublished) throw new Error(ALREADY_UNPUBLISHED);

  const { affected } = await updateQuestionnairePublishStatus(
    isPublished,
    idSharedBetweenVersions,
    highestVersionNumber,
  );

  // should always affect 2 lines, since it changes version 0 and highest
  if (affected !== 2) throw new Error(UNKNOWN_ERROR);

  return { userFriendlyMessage: SUCCESS_MESSAGE };
}
