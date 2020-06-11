import { getHighestVersionNumber } from '@/services/SymptomQuestionnaireService';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';

export default async function (newQuestionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const { id } = newQuestionnaire;
  const auxQuestionnaire = SymptomQuestionnaire.create(newQuestionnaire);
  const highestVersion = await getHighestVersionNumber(id);
  const zeroVersionQuestionnaire = SymptomQuestionnaire.merge(newQuestionnaire, { version: 0 });
  const highestVersionQuestionnaire = SymptomQuestionnaire.merge(auxQuestionnaire, { version: highestVersion + 1 });

  const [createdHighestVersion] = await SymptomQuestionnaire.save([
    highestVersionQuestionnaire,
    zeroVersionQuestionnaire,
  ]);

  return createdHighestVersion;
}
