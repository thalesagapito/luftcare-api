import { v4 as uuid } from 'uuid';
import { cloneDeep } from 'lodash';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { QuestionnaireSubscriberData } from '@/subscribers/SymptomQuestionnaireSubscriber';

export default async function (newQuestionnaire: SymptomQuestionnaire): Promise<SymptomQuestionnaire> {
  const versionOneQuestionnaire = SymptomQuestionnaire.merge(newQuestionnaire, {
    version: 1,
    id: uuid(),
  });

  const questionsWithoutIds = cloneDeep(versionOneQuestionnaire.questions);
  const data: QuestionnaireSubscriberData = { eventKind: 'create-initial', questionsWithoutIds };

  return SymptomQuestionnaire.save(versionOneQuestionnaire, { data });
}
