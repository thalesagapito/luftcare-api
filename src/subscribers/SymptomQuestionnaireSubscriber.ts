import {
  EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent,
} from 'typeorm';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import { SymptomQuestionnaireQuestionKind } from '@/enums';

type idRemover = (questionnaire: SymptomQuestionnaire) => SymptomQuestionnaire;
const clearIdFromQuestionnaire: idRemover = (questionnaire) => {
  const questionsWithoutId = questionnaire.questions.map((question) => {
    if (question.kind === SymptomQuestionnaireQuestionKind.FREE_RESPONSE) {
      return { ...question, id: undefined };
    }
    const choicesWithoutIds = question.possibleChoices?.map((choice) => ({ ...choice, id: undefined }));
    return { ...question, id: undefined, possibleChoices: choicesWithoutIds };
  });

  return SymptomQuestionnaire.create({
    ...questionnaire,
    questions: questionsWithoutId,
    id: undefined,
    version: 0,
  });
};

@EventSubscriber()
export default class SymptomQuestionnaireSubscriber implements EntitySubscriberInterface<SymptomQuestionnaire> {
  listenTo() {
    return SymptomQuestionnaire;
  }

  async afterInsert({ entity, manager }: InsertEvent<SymptomQuestionnaire>) {
    const { idSharedBetweenVersions, version } = entity;
    if (version === 0) return;

    const questionnaireWithoutIds = clearIdFromQuestionnaire(entity);

    await Promise.all([
      manager.delete(SymptomQuestionnaire, { version: 0, idSharedBetweenVersions }),
      manager.save(SymptomQuestionnaire, questionnaireWithoutIds),
    ]);
  }

  async afterUpdate({ entity, manager }: UpdateEvent<SymptomQuestionnaire>) {
    const { idSharedBetweenVersions, version } = entity;
    if (version === 0) return;

    const questionnaireWithoutIds = clearIdFromQuestionnaire(entity);

    const { id } = await manager.findOneOrFail(SymptomQuestionnaire, {
      where: { idSharedBetweenVersions, version: 0 },
    });

    await manager.save(SymptomQuestionnaire, { ...questionnaireWithoutIds, id });
  }
}
