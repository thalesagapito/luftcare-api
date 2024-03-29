import { isEmpty } from 'lodash';
import ResponseScore from '@/entities/ResponseScore';
import ScoreRange from '@/entities/QuestionnaireScoreRange';
import QuestionnaireResponse from '@/entities/QuestionnaireResponse';
import QuestionnaireResponseAnswer from '@/entities/QuestionnaireResponseAnswer';

const NO_ANSWERS_FOUND = 'Nenhuma resposta foi encontrada';
const NO_RANGE_REACHED_ERROR = 'Nenhum intervalo de pontuação foi atingido';
const MULTIPLE_RANGES_REACHED_ERROR = 'Mais de um intervalo de pontuação foi atingido';

function sumValueFromAnswerSelectedChoices(answers: QuestionnaireResponseAnswer[]): number {
  return answers.reduce((acc, { selectedChoice }) => {
    if (!selectedChoice || isEmpty(selectedChoice)) return acc;
    return acc + selectedChoice.value;
  }, 0);
}

function getScoreRangeByNumericValue(value: number, possibleRanges: ScoreRange[]): ScoreRange {
  const reachedRanges = possibleRanges.filter(({ minScore, maxScore }) => value >= minScore && value <= maxScore);

  if (reachedRanges.length === 0) throw new Error(NO_RANGE_REACHED_ERROR);
  if (reachedRanges.length > 1) throw new Error(MULTIPLE_RANGES_REACHED_ERROR);

  return reachedRanges[0];
}

export default function (response: QuestionnaireResponse): ResponseScore {
  const { questionAnswers = [], questionnaire: { scoreRanges = [] } } = response;

  if (questionAnswers.length === 0) throw new Error(NO_ANSWERS_FOUND);

  const numericValue = sumValueFromAnswerSelectedChoices(questionAnswers);
  const scoreRange = getScoreRangeByNumericValue(numericValue, scoreRanges);

  const { color, description, title } = scoreRange;

  const score = {
    value: numericValue,
    description,
    title,
    color,
  };

  return score;
}
