import { v4 as uuid } from 'uuid';
import { Nullable } from '@/helper-types';
import { SymptomQuestionnaireQuestionKind } from '@/enums';
import { findUserById as findUser } from '@/services/UserService';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import SymptomQuestionnaireQuestion from '@/entities/SymptomQuestionnaireQuestion';
import { createResponseWithAnswers } from '@/services/SymptomQuestionnaireResponseService';
import SymptomQuestionnaireQuestionChoice from '@/entities/SymptomQuestionnaireQuestionChoice';
import SymptomQuestionnaireResponseAnswer from '@/entities/SymptomQuestionnaireResponseAnswer';
import { findSymptomQuestionnaireByIdAndVersion as findQuestionnaire } from '@/services/SymptomQuestionnaireService';

const USER_NOT_FOUND_ERROR = 'Nenhum usuário foi encontrado com o id recebido';
const QUESTIONNAIRE_NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id recebido';
const MISSING_ANSWER_TO_QUESTION_ERROR = 'Faltam respostas para pelo menos uma pergunta do questionário';
const ANSWER_REFERS_TO_MISSING_CHOICE_ERROR = 'Alguma resposta do questionário selecionou uma opção inexistente';
const INTERNAL_ERROR_WHILE_SAVING = 'Ocorreu um erro interno ao salvar o preenchimento do questionário';

type QuestionAnswer = {
  writtenText?: string;
  questionId: string;
  choiceId?: string;
};

type Args = {
  questionAnswers: QuestionAnswer[];
  questionnaireVersion: number;
  questionnaireId: string;
  responseDate: Date;
  userId: string;
};

// eslint-disable-next-line max-len
function findAnswerReferringToQuestion(answers: QuestionAnswer[], question: SymptomQuestionnaireQuestion): Nullable<QuestionAnswer> {
  return answers.find(({ questionId }) => questionId === question.id);
}

// eslint-disable-next-line max-len
function findChoiceReferredInAnswer(choices: SymptomQuestionnaireQuestionChoice[], answer: QuestionAnswer): Nullable<SymptomQuestionnaireQuestionChoice> {
  return choices.find(({ id }) => id === answer.choiceId);
}

// eslint-disable-next-line max-len
function createQuestionAnswerModel(response: SymptomQuestionnaireResponse, question: SymptomQuestionnaireQuestion, answers: QuestionAnswer[]) {
  const id = uuid();
  const { possibleChoices = [], kind } = question;

  const questionAnswer = findAnswerReferringToQuestion(answers, question);
  if (!questionAnswer) throw new Error(MISSING_ANSWER_TO_QUESTION_ERROR);

  if (kind === SymptomQuestionnaireQuestionKind.FREE_RESPONSE) {
    const { writtenText } = questionAnswer;
    return SymptomQuestionnaireResponseAnswer.create({ question, response, writtenText });
  }

  const selectedChoice = findChoiceReferredInAnswer(possibleChoices, questionAnswer);
  if (!selectedChoice) throw new Error(ANSWER_REFERS_TO_MISSING_CHOICE_ERROR);

  return SymptomQuestionnaireResponseAnswer.create({
    id, question, response, selectedChoice,
  });
}


export default async function (args: Args): Promise<SymptomQuestionnaireResponse> {
  const { questionnaireId, questionnaireVersion, userId } = args;

  const [patient, questionnaire] = await Promise.all([
    findUser(userId),
    findQuestionnaire(questionnaireId, questionnaireVersion),
  ]);

  if (!patient) throw new Error(USER_NOT_FOUND_ERROR);
  if (!questionnaire) throw new Error(QUESTIONNAIRE_NOT_FOUND_ERROR);

  const id = uuid();
  const { responseDate, questionAnswers } = args;
  const response = SymptomQuestionnaireResponse.create({
    id, patient, questionnaire, responseDate,
  });

  const { questions } = questionnaire;

  const questionAnswersModels = questions.map((question) => createQuestionAnswerModel(
    response,
    question,
    questionAnswers,
  ));

  response.questionAnswers = questionAnswersModels;

  return createResponseWithAnswers(response, questionAnswersModels)
    .catch(() => {
      throw new Error(INTERNAL_ERROR_WHILE_SAVING);
    });
}
