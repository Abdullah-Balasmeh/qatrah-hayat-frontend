import { ScreeningResultModel } from '../../domain/models/screening-result.model';
import { SubmitScreeningResponseDto } from '../dtos/submit-screening-response.dto';

export function mapScreeningSubmitResponseDtoToModel(
  dto: SubmitScreeningResponseDto
): ScreeningResultModel {
  return {
    screeningSessionId: dto.screeningSessionId ?? null,
    sessionType: dto.sessionType ?? null,
    resultEligibilityStatus: dto.resultEligibilityStatus,
    nextEligibleDate: dto.nextEligibleDate ?? null,
    deferralReason: dto.deferralReason ?? null
  };
}
