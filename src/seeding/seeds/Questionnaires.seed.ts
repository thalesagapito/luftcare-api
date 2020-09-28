/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import { v4 as uuid } from 'uuid';
import { Connection, DeepPartial } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import Questionnaire from '@/entities/Questionnaire';
import QuestionnaireRepository from '@/repositories/QuestionnaireRepository';
import { QuestionnaireQuestionKind } from '@/enums';


const adultACTQuestionnaire: DeepPartial<Questionnaire> = {
  id: uuid(),
  version: 1,
  isPublished: false,
  nameForManagement: 'ACT - Adultos',
  nameForPresentation: 'Teste de controle da asma - Adultos',
  description: 'Para adultos, a partir de 12 anos',
  estimatedDurationInMinutes: 1,
  questions: [
    {
      id: uuid(),
      nameForManagement: 'Durante as últimas 4 semanas, quanto tempo a sua asma impediu-o de realizar atividades no trabalho, na escola ou em casa?',
      text: 'Durante as últimas 4 semanas, quanto tempo a sua asma impediu-o de realizar atividades no trabalho, na escola ou em casa?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 1,
      possibleChoices: [
        { id: uuid(), value: 1, presentationOrder: 1, nameForManagement: 'Sempre', text: 'Sempre' },
        { id: uuid(), value: 2, presentationOrder: 2, nameForManagement: 'A maior parte do tempo', text: 'A maior parte do tempo' },
        { id: uuid(), value: 3, presentationOrder: 3, nameForManagement: 'Alguma parte do tempo', text: 'Alguma parte do tempo' },
        { id: uuid(), value: 4, presentationOrder: 4, nameForManagement: 'Uma pequena parte do tempo', text: 'Uma pequena parte do tempo' },
        { id: uuid(), value: 5, presentationOrder: 5, nameForManagement: 'Nunca', text: 'Nunca' },
      ],
    },
    {
      id: uuid(),
      nameForManagement: 'Durante as últimas 4 semanas, quantas vezes você teve falta de ar?',
      text: 'Durante as últimas 4 semanas, quantas vezes você teve falta de ar?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 2,
      possibleChoices: [
        { id: uuid(), value: 1, presentationOrder: 1, nameForManagement: 'Mais de uma vez por dia', text: 'Mais de uma vez por dia' },
        { id: uuid(), value: 2, presentationOrder: 2, nameForManagement: 'Uma vez por dia', text: 'Uma vez por dia' },
        { id: uuid(), value: 3, presentationOrder: 3, nameForManagement: '3 a 6 vezes por semana', text: '3 a 6 vezes por semana' },
        { id: uuid(), value: 4, presentationOrder: 4, nameForManagement: 'Uma ou duas vezes por semana', text: 'Uma ou duas vezes por semana' },
        { id: uuid(), value: 5, presentationOrder: 5, nameForManagement: 'Nenhuma', text: 'Nenhuma' },
      ],
    },
    {
      id: uuid(),
      nameForManagement: 'Durante as últimas 4 semanas, quantas vezes os seus sintomas de asma (sibilância, tosse, falta de ar, aperto ou dor no peito) acordou-o durante a noite ou mais cedo que o normal pela manhã?',
      text: 'Durante as últimas 4 semanas, quantas vezes os seus sintomas de asma (sibilância, tosse, falta de ar, aperto ou dor no peito) acordou-o durante a noite ou mais cedo que o normal pela manhã?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 3,
      possibleChoices: [
        { id: uuid(), value: 1, presentationOrder: 1, nameForManagement: '4 ou mais noites por semana', text: '4 ou mais noites por semana' },
        { id: uuid(), value: 2, presentationOrder: 2, nameForManagement: '2 a 3 noites por semana', text: '2 a 3 noites por semana' },
        { id: uuid(), value: 3, presentationOrder: 3, nameForManagement: 'Uma vez por semana', text: 'Uma vez por semana' },
        { id: uuid(), value: 4, presentationOrder: 4, nameForManagement: 'Uma ou duas vezes', text: 'Uma ou duas vezes' },
        { id: uuid(), value: 5, presentationOrder: 5, nameForManagement: 'Nenhuma', text: 'Nenhuma' },
      ],
    },
    {
      id: uuid(),
      nameForManagement: 'Durante as últimas 4 semanas, quantas vezes você usou o seu medicamento de inalação ou nebulização (como o Salbutamol)?',
      text: 'Durante as últimas 4 semanas, quantas vezes você usou o seu medicamento de inalação ou nebulização (como o Salbutamol)?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 4,
      possibleChoices: [
        { id: uuid(), value: 1, presentationOrder: 1, nameForManagement: '3 ou mais vezes por dia', text: '3 ou mais vezes por dia' },
        { id: uuid(), value: 2, presentationOrder: 2, nameForManagement: '1 ou 2 vezes por dia', text: '1 ou 2 vezes por dia' },
        { id: uuid(), value: 3, presentationOrder: 3, nameForManagement: '2 ou 3 vezes por semana', text: '2 ou 3 vezes por semana' },
        { id: uuid(), value: 4, presentationOrder: 4, nameForManagement: 'Uma vez por semana ou menos', text: 'Uma vez por semana ou menos' },
        { id: uuid(), value: 5, presentationOrder: 5, nameForManagement: 'Nenhuma', text: 'Nenhuma' },
      ],
    },
    {
      id: uuid(),
      nameForManagement: 'Como você classificaria o seu controle da asma durante as últimas 4 semanas?',
      text: 'Como você classificaria o seu controle da asma durante as últimas 4 semanas?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 5,
      possibleChoices: [
        { id: uuid(), value: 1, presentationOrder: 1, nameForManagement: 'Nem um pouco controlada', text: 'Nem um pouco controlada' },
        { id: uuid(), value: 2, presentationOrder: 2, nameForManagement: 'Mal controlada', text: 'Mal controlada' },
        { id: uuid(), value: 3, presentationOrder: 3, nameForManagement: 'Um pouco controlada', text: 'Um pouco controlada' },
        { id: uuid(), value: 4, presentationOrder: 4, nameForManagement: 'Bem controlada', text: 'Bem controlada' },
        { id: uuid(), value: 5, presentationOrder: 5, nameForManagement: 'Completamente Controlada', text: 'Completamente Controlada' },
      ],
    },
  ],
  responses: [],
  scoreRanges: [],
};

export default class CreateQuestionnaires implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    await connection.getCustomRepository(QuestionnaireRepository).save([
      adultACTQuestionnaire,
    ]);
  }
}
