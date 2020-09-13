import { getCustomRepository } from 'typeorm';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import SymptomQuestionnaireRepository from '@/repositories/SymptomQuestionnaireRepository';

const NOT_FOUND_ERROR = 'Nenhum questionário foi encontrado com o id e a versão recebidas';

export default async function (id: string, version: number): Promise<SymptomQuestionnaire> {
  const questionnaireRepository = getCustomRepository(SymptomQuestionnaireRepository);

  const questionnaire = await questionnaireRepository.findSymptomQuestionnaireByIdAndVersion(id, version);
  if (!questionnaire) throw new Error(NOT_FOUND_ERROR);

  return questionnaire;
}
