import { getHighestVersionNumber } from '@/services/SymptomQuestionnaireService';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';

export default async function (idSharedBetweenVersions: string, newQuestionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const highestVersion = await getHighestVersionNumber(idSharedBetweenVersions);

  if (!highestVersion) throw new Error(NOT_FOUND_ERROR);

  const highestVersionQuestionnaire = SymptomQuestionnaire.merge(newQuestionnaire, {
    idSharedBetweenVersions,
    version: highestVersion + 1,
  });

  return SymptomQuestionnaire.save(highestVersionQuestionnaire);
}
