/* eslint-disable no-param-reassign */
import { v4 as uuid } from 'uuid';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { createQuestionnaireWithChildEntities } from '@/services/SymptomQuestionnaireService';

export default async function (questionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  questionnaire.id = uuid();
  questionnaire.version = 1;

  await createQuestionnaireWithChildEntities(questionnaire);

  return questionnaire;
}
