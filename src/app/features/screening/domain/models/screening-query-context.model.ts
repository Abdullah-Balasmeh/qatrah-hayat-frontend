import { ScreeningSessionType } from '../enums/screening-session-type.enum';

export const SCREENING_DONATION_INTENT_SOURCE = 'donationIntent';

export interface ScreeningQueryContextModel {
  sessionType: ScreeningSessionType;
  isForFemaleOnly: boolean;
  source?: string | null;
  donationIntentId?: number | null;
  requiresDonationIntentId: boolean;
}
