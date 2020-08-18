import { isUUID } from 'class-validator';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { findQuestionnaireWithHighestVersion } from '@/services/SymptomQuestionnaireService';

const NOT_VALID_UUID_ERROR = 'O id recebido é um UUID inválido';
const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';

export default async function (id: string): Promise<SymptomQuestionnaire> {
  const isValidUUID = isUUID(id);
  if (!isValidUUID) throw new Error(NOT_VALID_UUID_ERROR);

  const questionnaire = await findQuestionnaireWithHighestVersion(id);
  if (!questionnaire) throw new Error(NOT_FOUND_ERROR);

  return questionnaire;
}
