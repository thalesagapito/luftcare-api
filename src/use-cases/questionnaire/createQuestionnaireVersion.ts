/* eslint-disable no-param-reassign */
import { getCustomRepository } from 'typeorm';
import Questionnaire from '@/entities/Questionnaire';
import QuestionnaireRepository from '@/repositories/QuestionnaireRepository';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';

export default async function (id: string, questionnaire: Questionnaire): Promise<Questionnaire> {
  const questionnaireRepository = getCustomRepository(QuestionnaireRepository);

  const highestVersion = await questionnaireRepository.getHighestVersionNumber(id);
  if (!highestVersion) throw new Error(NOT_FOUND_ERROR);

  questionnaire.id = id;
  questionnaire.version = highestVersion + 1;

  await questionnaireRepository.createQuestionnaireWithChildEntities(questionnaire);

  return questionnaire;
}
