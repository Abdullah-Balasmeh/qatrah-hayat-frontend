import { ScreeningResultStatus } from '../enums/screening-result-status.enum';
import { ScreeningSessionType } from '../enums/screening-session-type.enum';

export interface ScreeningResultModel {
  screeningSessionId?: number | null;
  sessionType?: ScreeningSessionType | null;
  resultEligibilityStatus: ScreeningResultStatus;
  nextEligibleDate?: string | null;
  deferralReason?: string | null;
}
