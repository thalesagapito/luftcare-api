/* eslint-disable no-param-reassign */
import { getCustomRepository } from 'typeorm';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import SymptomQuestionnaireRepository from '@/repositories/SymptomQuestionnaireRepository';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';

export default async function (id: string, questionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const questionnaireRepository = getCustomRepository(SymptomQuestionnaireRepository);

  const highestVersion = await questionnaireRepository.getHighestVersionNumber(id);
  if (!highestVersion) throw new Error(NOT_FOUND_ERROR);

  questionnaire.id = id;
  questionnaire.version = highestVersion + 1;

  await questionnaireRepository.createQuestionnaireWithChildEntities(questionnaire);

  return questionnaire;
}
