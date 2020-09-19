import { getCustomRepository } from 'typeorm';
import Questionnaire from '@/entities/Questionnaire';
import QuestionnaireRepository from '@/repositories/QuestionnaireRepository';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id e a versão recebidas';

export default async function (id: string, version: number): Promise<Questionnaire> {
  const questionnaireRepository = getCustomRepository(QuestionnaireRepository);

  const questionnaire = await questionnaireRepository.findQuestionnaireByIdAndVersion(id, version);
  if (!questionnaire) throw new Error(NOT_FOUND_ERROR);

  return questionnaire;
}
