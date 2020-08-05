/* eslint-disable no-param-reassign */
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { getHighestVersionNumber, createQuestionnaireWithQuestionsAndChoices } from '@/services/SymptomQuestionnaireService';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';

export default async function (id: string, questionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const highestVersion = await getHighestVersionNumber(id);

  if (!highestVersion) throw new Error(NOT_FOUND_ERROR);

  questionnaire.id = id;
  questionnaire.version = highestVersion + 1;

  await createQuestionnaireWithQuestionsAndChoices(questionnaire);

  return questionnaire;
}
