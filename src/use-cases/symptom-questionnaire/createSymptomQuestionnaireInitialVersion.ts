import { v4 as uuidv4 } from 'uuid';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';

export default async function (newQuestionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const idSharedBetweenVersions = uuidv4();

  const versionOneQuestionnaire = SymptomQuestionnaire.merge(newQuestionnaire, {
    version: 1,
    idSharedBetweenVersions,
  });

  return SymptomQuestionnaire.save(versionOneQuestionnaire);
}
