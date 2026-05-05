import { ScreeningSessionType } from '../enums/screening-session-type.enum';

export interface ScreeningQuestionModel {
  id: number;
  questionTextAr: string | null;
  questionTextEn: string | null;
  sessionType: ScreeningSessionType;
  displayOrder: number;
  isForFemaleOnly: boolean;
  requiresAdditionalText: boolean;
  requiresDateValue: boolean;
  additionalTextLabelAr?: string | null;
  additionalTextLabelEn?: string | null;
  dateValueLabelAr?: string | null;
  dateValueLabelEn?: string | null;
}
