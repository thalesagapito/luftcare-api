import { v4 as uuidv4 } from 'uuid';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';

export default async function (newQuestionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const idSharedBetweenVersions = uuidv4();
  const auxQuestionnaire = SymptomQuestionnaire.create(newQuestionnaire);

  const versionOneQuestionnaire = SymptomQuestionnaire.merge(newQuestionnaire, {
    version: 1,
    idSharedBetweenVersions,
  });
  const versionZeroQuestionnaire = SymptomQuestionnaire.merge(auxQuestionnaire, {
    version: 0,
    idSharedBetweenVersions,
  });

  const [createdVersionOne] = await SymptomQuestionnaire.save([
    versionOneQuestionnaire,
    versionZeroQuestionnaire,
  ]);

  return createdVersionOne;
}
