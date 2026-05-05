export interface ScreeningAnswerModel {
  screeningQuestionId: number;
  answer: boolean;
  additionalText: string | null;
  conditionalDateValue: string | null;
}
