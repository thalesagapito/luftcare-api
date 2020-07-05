import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { findQuestionnaireWithHighestVersion } from '@/services/SymptomQuestionnaireService';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';

export default async function (id: string): Promise<SymptomQuestionnaire> {
  const questionnaire = await findQuestionnaireWithHighestVersion(id);

  if (!questionnaire) throw new Error(NOT_FOUND_ERROR);

  return questionnaire;
}
