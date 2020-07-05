/* eslint-disable no-case-declarations */
import {
  InsertEvent,
  UpdateEvent,
  DeepPartial,
  EventSubscriber,
  EntitySubscriberInterface,
} from 'typeorm';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';

type QuestionnaireEventKind = 'create-initial' | 'create-version' | 'update' | 'softRemove' | 'recover';

export type QuestionnaireSubscriberData = {
  questionsWithoutIds?: SymptomQuestionnaireQuestion[];
  updatedFields?: DeepPartial<SymptomQuestionnaire>;
  eventKind?: QuestionnaireEventKind;
};

const EVENT_KIND_NOT_FOUND = 'Campo `eventKind` ausente no objeto `data` da operação';


@EventSubscriber()
export default class SymptomQuestionnaireSubscriber implements EntitySubscriberInterface<SymptomQuestionnaire> {
  listenTo() {
    return SymptomQuestionnaire;
  }

  async afterInsert({ entity, manager, queryRunner }: InsertEvent<SymptomQuestionnaire>) {
    const { eventKind, questionsWithoutIds } = queryRunner.data as QuestionnaireSubscriberData;

    if (!eventKind) throw new Error(EVENT_KIND_NOT_FOUND);

    const zeroVersionQuestionnaire = manager
      .create(SymptomQuestionnaire, {
        ...entity, version: 0, questions: questionsWithoutIds,
      });

    await manager.delete(SymptomQuestionnaire, { id: entity.id, version: 0 });
    await manager.save(SymptomQuestionnaire, zeroVersionQuestionnaire, { listeners: false });
  }

  async afterUpdate({ entity, manager, queryRunner }: UpdateEvent<SymptomQuestionnaire>) {
    const zeroVersionQuestionnairePromise = manager
      .findOneOrFail(SymptomQuestionnaire, { where: { id: entity.id, version: 0 } });
    const { eventKind, updatedFields = {} } = queryRunner.data as QuestionnaireSubscriberData;

    if (!eventKind) throw new Error(EVENT_KIND_NOT_FOUND);

    const zeroVersionQuestionnaire = await zeroVersionQuestionnairePromise;

    switch (eventKind) {
      case 'softRemove':
        await manager
          .getRepository(SymptomQuestionnaire)
          .softRemove(zeroVersionQuestionnaire, { listeners: false });
        return;

      case 'recover':
        await manager
          .getRepository(SymptomQuestionnaire)
          .recover(zeroVersionQuestionnaire, { listeners: false });
        return;

      case 'update':
      default:
        const updatedQuestionnaire = manager
          .merge(SymptomQuestionnaire, zeroVersionQuestionnaire, updatedFields);
        await manager
          .save(updatedQuestionnaire);
    }
  }
}
