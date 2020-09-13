/* eslint-disable no-param-reassign */
import { v4 as uuid } from 'uuid';
import { getCustomRepository } from 'typeorm';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import SymptomQuestionnaireRepository from '@/repositories/SymptomQuestionnaireRepository';

export default async function (questionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const questionnaireRepository = getCustomRepository(SymptomQuestionnaireRepository);
  questionnaire.id = uuid();
  questionnaire.version = 1;

  await questionnaireRepository.createQuestionnaireWithChildEntities(questionnaire);

  return questionnaire;
}
