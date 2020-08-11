import { isEmpty } from 'lodash';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import SymptomQuestionnaireResponseAnswer from '@/entities/SymptomQuestionnaireResponseAnswer';

// eslint-disable-next-line max-len
function sumValueFromAnswerSelectedChoices(answers: SymptomQuestionnaireResponseAnswer[]): number {
  return answers.reduce((acc, { selectedChoice }) => {
    if (!selectedChoice || isEmpty(selectedChoice)) return acc;
    return acc + selectedChoice.value;
  }, 0);
}

export default function (response: SymptomQuestionnaireResponse): number {
  const { questionAnswers } = response;
  // TODO add labels for each value range in questionnaire
  // const { questionnaire, questionAnswers } = response;
  // const { questions } = questionnaire;

  const finalValue = sumValueFromAnswerSelectedChoices(questionAnswers);

  return finalValue;
}
