import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { findSymptomQuestionnaireByIdAndVersion } from '@/services/SymptomQuestionnaireService';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id e a versão recebidas';

export default async function (id: string, version: number): Promise<SymptomQuestionnaire> {
  const questionnaire = await findSymptomQuestionnaireByIdAndVersion(id, version);

  if (!questionnaire) throw new Error(NOT_FOUND_ERROR);

  return questionnaire;
}
