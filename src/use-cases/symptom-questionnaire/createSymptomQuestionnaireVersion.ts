import { cloneDeep } from 'lodash';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { getHighestVersionNumber } from '@/services/SymptomQuestionnaireService';
import { QuestionnaireSubscriberData } from '@/subscribers/SymptomQuestionnaireSubscriber';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';

export default async function (id: string, newQuestionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const highestVersion = await getHighestVersionNumber(id);

  if (!highestVersion) throw new Error(NOT_FOUND_ERROR);

  const highestVersionQuestionnaire = SymptomQuestionnaire.merge(newQuestionnaire, {
    id,
    version: highestVersion + 1,
  });

  const questionsWithoutIds = cloneDeep(highestVersionQuestionnaire.questions);
  const data: QuestionnaireSubscriberData = { eventKind: 'create-initial', questionsWithoutIds };

  return SymptomQuestionnaire.save(highestVersionQuestionnaire, { data });
}
