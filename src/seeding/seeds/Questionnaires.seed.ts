/* eslint-disable max-len, no-console, object-curly-newline */
import { v4 as uuid } from 'uuid';
import { Connection, DeepPartial } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import Questionnaire from '@/entities/Questionnaire';
import QuestionnaireRepository from '@/repositories/QuestionnaireRepository';
import { QuestionnaireQuestionKind } from '@/enums';

const adultActNameForManagement = 'ACT - Adultos';
const adultActBlueprint: DeepPartial<Questionnaire> = {
  id: uuid(),
  version: 1,
  isPublished: false,
  nameForManagement: adultActNameForManagement,
  nameForPresentation: 'Teste de controle da asma - Adultos',
  description: 'Para pessoas a partir de 12 anos',
  estimatedDurationInMinutes: 1,
  responses: [],
  scoreRanges: [],
  questions: [
    {
      nameForManagement: 'Quanto tempo os sintomas impediram de realizar atividades no último mês',
      text: 'Durante as últimas 4 semanas, quanto tempo a sua asma impediu-o de realizar atividades no trabalho, na escola ou em casa?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 1,
      possibleChoices: [
        { value: 1, presentationOrder: 1, nameForManagement: 'Sempre', text: 'Sempre' },
        { value: 2, presentationOrder: 2, nameForManagement: 'A maior parte do tempo', text: 'A maior parte do tempo' },
        { value: 3, presentationOrder: 3, nameForManagement: 'Alguma parte do tempo', text: 'Alguma parte do tempo' },
        { value: 4, presentationOrder: 4, nameForManagement: 'Uma pequena parte do tempo', text: 'Uma pequena parte do tempo' },
        { value: 5, presentationOrder: 5, nameForManagement: 'Nunca', text: 'Nunca' },
      ],
    },
    {
      nameForManagement: 'Quantas vezes teve falta de ar no último mês',
      text: 'Durante as últimas 4 semanas, quantas vezes você teve falta de ar?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 2,
      possibleChoices: [
        { value: 1, presentationOrder: 1, nameForManagement: 'Mais de uma vez por dia', text: 'Mais de uma vez por dia' },
        { value: 2, presentationOrder: 2, nameForManagement: 'Uma vez por dia', text: 'Uma vez por dia' },
        { value: 3, presentationOrder: 3, nameForManagement: '3 a 6 vezes por semana', text: '3 a 6 vezes por semana' },
        { value: 4, presentationOrder: 4, nameForManagement: 'Uma ou duas vezes por semana', text: 'Uma ou duas vezes por semana' },
        { value: 5, presentationOrder: 5, nameForManagement: 'Nenhuma', text: 'Nenhuma' },
      ],
    },
    {
      nameForManagement: 'Quantas vezes acordou devido aos sintomas no último mês',
      text: 'Durante as últimas 4 semanas, quantas vezes os seus sintomas de asma (sibilância, tosse, falta de ar, aperto ou dor no peito) acordou-o durante a noite ou mais cedo que o normal pela manhã?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 3,
      possibleChoices: [
        { value: 1, presentationOrder: 1, nameForManagement: '4 ou mais noites por semana', text: '4 ou mais noites por semana' },
        { value: 2, presentationOrder: 2, nameForManagement: '2 a 3 noites por semana', text: '2 a 3 noites por semana' },
        { value: 3, presentationOrder: 3, nameForManagement: 'Uma vez por semana', text: 'Uma vez por semana' },
        { value: 4, presentationOrder: 4, nameForManagement: 'Uma ou duas vezes', text: 'Uma ou duas vezes' },
        { value: 5, presentationOrder: 5, nameForManagement: 'Nenhuma', text: 'Nenhuma' },
      ],
    },
    {
      nameForManagement: 'Quantas vezes usou medicamento de inalação ou nebulização no último mês',
      text: 'Durante as últimas 4 semanas, quantas vezes você usou o seu medicamento de inalação ou nebulização (como o Salbutamol)?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 4,
      possibleChoices: [
        { value: 1, presentationOrder: 1, nameForManagement: '3 ou mais vezes por dia', text: '3 ou mais vezes por dia' },
        { value: 2, presentationOrder: 2, nameForManagement: '1 ou 2 vezes por dia', text: '1 ou 2 vezes por dia' },
        { value: 3, presentationOrder: 3, nameForManagement: '2 ou 3 vezes por semana', text: '2 ou 3 vezes por semana' },
        { value: 4, presentationOrder: 4, nameForManagement: 'Uma vez por semana ou menos', text: 'Uma vez por semana ou menos' },
        { value: 5, presentationOrder: 5, nameForManagement: 'Nenhuma', text: 'Nenhuma' },
      ],
    },
    {
      nameForManagement: 'Autoavaliação do controle da asma no último mês',
      text: 'Como você classificaria o seu controle da asma durante as últimas 4 semanas?',
      kind: QuestionnaireQuestionKind.MULTIPLE_CHOICE,
      presentationOrder: 5,
      possibleChoices: [
        { value: 1, presentationOrder: 1, nameForManagement: 'Nem um pouco controlada', text: 'Nem um pouco controlada' },
        { value: 2, presentationOrder: 2, nameForManagement: 'Mal controlada', text: 'Mal controlada' },
        { value: 3, presentationOrder: 3, nameForManagement: 'Um pouco controlada', text: 'Um pouco controlada' },
        { value: 4, presentationOrder: 4, nameForManagement: 'Bem controlada', text: 'Bem controlada' },
        { value: 5, presentationOrder: 5, nameForManagement: 'Completamente Controlada', text: 'Completamente Controlada' },
      ],
    },
  ],
};

// TODO later this might need some api and structural changes
// const childrenActNameForManagement = 'ACT - Crianças';
// const childrenActBlueprint: DeepPartial<Questionnaire> = {
//   id: uuid(),
//   version: 1,
//   isPublished: false,
//   nameForManagement: childrenActNameForManagement,
//   nameForPresentation: 'Teste de controle da asma - Crianças',
//   description: 'Para crianças de 4 a 11 anos',
//   estimatedDurationInMinutes: 5,
//   responses: [],
//   scoreRanges: [],
//   questions: [],
// };

export default class CreateQuestionnaires implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const questionnaireRepository = connection.getCustomRepository(QuestionnaireRepository);

    console.info('\n📝 Searching for existing adult ACT questionnaire 🔍');
    const existingAdultActQuestionnaire = await questionnaireRepository.findOne({ where: { nameForManagement: adultActNameForManagement } });
    const hasAdultActQuestionnaire = existingAdultActQuestionnaire !== undefined;
    const shouldCreateAdultActQuestionnaire = !hasAdultActQuestionnaire;
    if (hasAdultActQuestionnaire) console.info('📝 Adult ACT questionnaire already exists 🚫');

    // const existingChildrenActQuestionnaire = await questionnaireRepository.findOne({ where: { nameForManagement: childrenActNameForManagement } });
    // const hasChildrenActQuestionnaire = existingChildrenActQuestionnaire !== undefined;
    // const shouldCreateChildrenActQuestionnaire = !hasChildrenActQuestionnaire;
    // if (hasChildrenActQuestionnaire) console.info('Children ACT questionnaire already exists');

    const adultActQuestionnaire = Questionnaire.create(adultActBlueprint);
    // const childrenActQuestionnaire = Questionnaire.create(childrenActBlueprint);

    if (shouldCreateAdultActQuestionnaire) await questionnaireRepository.createQuestionnaireWithChildEntities(adultActQuestionnaire);
    // if (shouldCreateChildrenActQuestionnaire) await questionnaireRepository.createQuestionnaireWithChildEntities(childrenActQuestionnaire);
  }
}
