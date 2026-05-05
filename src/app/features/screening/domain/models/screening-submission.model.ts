import { ScreeningSessionType } from '../enums/screening-session-type.enum';
import { ScreeningAnswerModel } from './screening-answer.model';

export interface ScreeningSubmissionModel {
  sessionType: ScreeningSessionType;
  donationIntentId?: number | null;
  answers: ScreeningAnswerModel[];
}
