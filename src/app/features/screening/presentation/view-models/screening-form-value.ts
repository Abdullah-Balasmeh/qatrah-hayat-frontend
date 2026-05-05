import { ScreeningQueryContextModel } from '../../domain/models/screening-query-context.model';
import { ScreeningQuestionModel } from '../../domain/models/screening-question.model';
import { ScreeningSubmissionModel } from '../../domain/models/screening-submission.model';

export type ScreeningAnswerFormValue = {
  screeningQuestionId: number;
  answer: boolean | null;
  additionalText: string | null;
  conditionalDateValue: string | null;
};

export type ScreeningFormValue = {
  answers: ScreeningAnswerFormValue[];
  iConfirm: boolean;
};

export function mapScreeningFormValueToSubmission(
  formValue: ScreeningFormValue,
  context: ScreeningQueryContextModel,
  questions: ScreeningQuestionModel[]
): ScreeningSubmissionModel {
  return {
    sessionType: context.sessionType,
    donationIntentId: context.donationIntentId ?? null,
    answers: formValue.answers.map((answerValue) => {
      const answer = normalizeAnswer(answerValue.answer);
      const question = questions.find(
        (item) => item.id === answerValue.screeningQuestionId
      );

      return {
        screeningQuestionId: answerValue.screeningQuestionId,
        answer,
        additionalText: shouldSubmitAdditionalText(answer, question)
          ? normalizeText(answerValue.additionalText)
          : null,
        conditionalDateValue: shouldSubmitConditionalDate(answer, question)
          ? normalizeText(answerValue.conditionalDateValue)
          : null
      };
    })
  };
}

function normalizeAnswer(answer: boolean | null): boolean {
  if (answer === null) {
    throw new Error('Screening answer is required before submission mapping.');
  }

  return answer;
}

function shouldSubmitAdditionalText(
  answer: boolean,
  question: ScreeningQuestionModel | undefined
): boolean {
  return answer && question?.requiresAdditionalText === true;
}

function shouldSubmitConditionalDate(
  answer: boolean,
  question: ScreeningQuestionModel | undefined
): boolean {
  return answer && question?.requiresDateValue === true;
}

function normalizeText(value: string | null): string | null {
  const normalizedValue = value?.trim() ?? '';

  return normalizedValue === '' ? null : normalizedValue;
}
