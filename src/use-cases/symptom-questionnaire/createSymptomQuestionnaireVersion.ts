import { getHighestVersionNumber } from '@/services/SymptomQuestionnaireService';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';

export default async function (idSharedBetweenVersions: string, newQuestionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const auxQuestionnaire = SymptomQuestionnaire.create(newQuestionnaire);
  const highestVersion = await getHighestVersionNumber(idSharedBetweenVersions);

  if (!highestVersion) throw new Error('Nenhum questionário com o id recebido encontrado');

  const zeroVersionQuestionnaire = SymptomQuestionnaire.merge(newQuestionnaire, {
    idSharedBetweenVersions,
    version: 0,
  });
  const highestVersionQuestionnaire = SymptomQuestionnaire.merge(auxQuestionnaire, {
    idSharedBetweenVersions,
    version: highestVersion + 1,
  });

  await SymptomQuestionnaire.delete({ version: 0, idSharedBetweenVersions });

  const [createdHighestVersion] = await SymptomQuestionnaire.save([
    highestVersionQuestionnaire,
    zeroVersionQuestionnaire,
  ]);

  return createdHighestVersion;
}
