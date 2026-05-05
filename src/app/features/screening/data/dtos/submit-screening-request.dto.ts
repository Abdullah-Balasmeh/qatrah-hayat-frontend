import { ScreeningSessionType } from '../../domain/enums/screening-session-type.enum';

export interface SubmitScreeningAnswerRequestDto {
  screeningQuestionId: number;
  answer: boolean;
  additionalText: string | null;
  conditionalDateValue: string | null;
}

export interface SubmitScreeningRequestDto {
  sessionType: ScreeningSessionType;
  donationIntentId?: number | null;
  answers: SubmitScreeningAnswerRequestDto[];
}
