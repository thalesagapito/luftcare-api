import { isEmpty } from 'lodash';
import ResponseScore from '@/entities/ResponseScore';
import ScoreRange from '@/entities/SymptomQuestionnaireScoreRange';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import SymptomQuestionnaireResponseAnswer from '@/entities/SymptomQuestionnaireResponseAnswer';

const NO_RANGE_REACHED_ERROR = 'Nenhum intervalo de pontuação foi atingido';
const MULTIPLE_RANGES_REACHED_ERROR = 'Mais de um intervalo de pontuação foi atingido';

function sumValueFromAnswerSelectedChoices(answers: SymptomQuestionnaireResponseAnswer[]): number {
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

export default function (response: SymptomQuestionnaireResponse): ResponseScore {
  const { questionAnswers } = response;
  const { scoreRanges = [] } = response.questionnaire;

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
