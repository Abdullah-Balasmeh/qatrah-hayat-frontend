import { ScreeningResultStatus } from '../../domain/enums/screening-result-status.enum';
import { ScreeningSessionType } from '../../domain/enums/screening-session-type.enum';

export interface SubmitScreeningResponseDto {
  screeningSessionId?: number | null;
  sessionType?: ScreeningSessionType | null;
  resultEligibilityStatus: ScreeningResultStatus;
  nextEligibleDate?: string | null;
  deferralReason?: string | null;
  profileCompletionState?: string | null;
  createdAt?: string | null;
  savedAnswersCount?: number | null;
}
