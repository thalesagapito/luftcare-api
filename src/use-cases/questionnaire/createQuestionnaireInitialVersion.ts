/* eslint-disable no-param-reassign */
import { v4 as uuid } from 'uuid';
import { getCustomRepository } from 'typeorm';
import Questionnaire from '@/entities/Questionnaire';
import QuestionnaireRepository from '@/repositories/QuestionnaireRepository';

export default async function (questionnaire: Questionnaire): Promise<Questionnaire> {
  const questionnaireRepository = getCustomRepository(QuestionnaireRepository);
  questionnaire.id = uuid();
  questionnaire.version = 1;

  await questionnaireRepository.createQuestionnaireWithChildEntities(questionnaire);

  return questionnaire;
}
