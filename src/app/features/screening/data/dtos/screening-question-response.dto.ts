import { ScreeningSessionType } from '../../domain/enums/screening-session-type.enum';

export interface ScreeningQuestionResponseDto {
  id: number;
  textAr?: string | null;
  textEn?: string | null;
  questionText?: string | null;
  questionTextAr?: string | null;
  questionTextEn?: string | null;
  questionTextAR?: string | null;
  questionTextEN?: string | null;
  sessionType: ScreeningSessionType;
  displayOrder: number;
  isForFemaleOnly: boolean;
  requiresAdditionalText: boolean;
  requiresDateValue: boolean;
  additionalTextLabelAr?: string | null;
  additionalTextLabelEn?: string | null;
  conditionalDateLabelAr?: string | null;
  conditionalDateLabelEn?: string | null;
  dateValueLabelAr?: string | null;
  dateValueLabelEn?: string | null;
}
