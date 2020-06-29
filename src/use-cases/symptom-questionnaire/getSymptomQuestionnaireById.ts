import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { findQuestionnaireById } from '@/services/SymptomQuestionnaireService';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';

export default async function (id: string): Promise<SymptomQuestionnaire> {
  const questionnaire = await findQuestionnaireById(id);
  if (!questionnaire) throw new Error(NOT_FOUND_ERROR);

  return questionnaire;
}
