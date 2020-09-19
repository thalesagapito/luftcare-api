import { v4 as uuid } from 'uuid';
import { getCustomRepository } from 'typeorm';
import { Nullable } from '@/helper-types';
import UserRepository from '@/repositories/UserRepository';
import { QuestionnaireQuestionKind } from '@/enums';
import QuestionnaireResponse from '@/entities/QuestionnaireResponse';
import QuestionnaireQuestion from '@/entities/QuestionnaireQuestion';
import QuestionnaireRepository from '@/repositories/QuestionnaireRepository';
import QuestionnaireQuestionChoice from '@/entities/QuestionnaireQuestionChoice';
import QuestionnaireResponseAnswer from '@/entities/QuestionnaireResponseAnswer';
import QuestionnaireResponseRepository from '@/repositories/QuestionnaireResponseRepository';

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
function findAnswerReferringToQuestion(answers: QuestionAnswer[], question: QuestionnaireQuestion): Nullable<QuestionAnswer> {
  return answers.find(({ questionId }) => questionId === question.id);
}

// eslint-disable-next-line max-len
function findChoiceReferredInAnswer(choices: QuestionnaireQuestionChoice[], answer: QuestionAnswer): Nullable<QuestionnaireQuestionChoice> {
  return choices.find(({ id }) => id === answer.choiceId);
}

// eslint-disable-next-line max-len
function createQuestionAnswerModel(response: QuestionnaireResponse, question: QuestionnaireQuestion, answers: QuestionAnswer[]) {
  const id = uuid();
  const { possibleChoices = [], kind } = question;

  const questionAnswer = findAnswerReferringToQuestion(answers, question);
  if (!questionAnswer) throw new Error(MISSING_ANSWER_TO_QUESTION_ERROR);

  if (kind === QuestionnaireQuestionKind.FREE_RESPONSE) {
    const { writtenText } = questionAnswer;
    return QuestionnaireResponseAnswer.create({ question, response, writtenText });
  }

  const selectedChoice = findChoiceReferredInAnswer(possibleChoices, questionAnswer);
  if (!selectedChoice) throw new Error(ANSWER_REFERS_TO_MISSING_CHOICE_ERROR);

  return QuestionnaireResponseAnswer.create({
    id, question, response, selectedChoice,
  });
}


export default async function (args: Args): Promise<QuestionnaireResponse> {
  const { questionnaireId, questionnaireVersion, userId } = args;
  const userRepository = getCustomRepository(UserRepository);
  const questionnaireRepository = getCustomRepository(QuestionnaireRepository);
  const responseRepository = getCustomRepository(QuestionnaireResponseRepository);


  const [patient, questionnaire] = await Promise.all([
    userRepository.findUserById(userId),
    questionnaireRepository.findQuestionnaireByIdAndVersion(questionnaireId, questionnaireVersion),
  ]);

  if (!patient) throw new Error(USER_NOT_FOUND_ERROR);
  if (!questionnaire) throw new Error(QUESTIONNAIRE_NOT_FOUND_ERROR);

  const id = uuid();
  const { responseDate, questionAnswers } = args;
  const response = QuestionnaireResponse.create({
    id, patient, questionnaire, responseDate,
  });

  const { questions } = questionnaire;

  const questionAnswersModels = questions.map((question) => createQuestionAnswerModel(
    response,
    question,
    questionAnswers,
  ));

  response.questionAnswers = questionAnswersModels;

  return responseRepository.createResponseWithAnswers(response, questionAnswersModels)
    .catch(() => {
      throw new Error(INTERNAL_ERROR_WHILE_SAVING);
    });
}
