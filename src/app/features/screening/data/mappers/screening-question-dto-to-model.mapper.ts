import { ScreeningQuestionModel } from '../../domain/models/screening-question.model';
import { ScreeningQuestionResponseDto } from '../dtos/screening-question-response.dto';

export function mapScreeningQuestionDtoToModel(
  dto: ScreeningQuestionResponseDto
): ScreeningQuestionModel {
  return {
    id: dto.id,
    questionTextAr: dto.textAr ?? dto.questionTextAr ?? dto.questionTextAR ?? dto.questionText ?? null,
    questionTextEn: dto.textEn ?? dto.questionTextEn ?? dto.questionTextEN ?? dto.questionText ?? null,
    sessionType: dto.sessionType,
    displayOrder: dto.displayOrder,
    isForFemaleOnly: dto.isForFemaleOnly,
    requiresAdditionalText: dto.requiresAdditionalText,
    requiresDateValue: dto.requiresDateValue,
    additionalTextLabelAr: dto.additionalTextLabelAr ?? null,
    additionalTextLabelEn: dto.additionalTextLabelEn ?? null,
    dateValueLabelAr: dto.conditionalDateLabelAr ?? dto.dateValueLabelAr ?? null,
    dateValueLabelEn: dto.conditionalDateLabelEn ?? dto.dateValueLabelEn ?? null
  };
}
