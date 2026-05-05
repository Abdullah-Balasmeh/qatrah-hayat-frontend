import { ScreeningSubmissionModel } from '../../domain/models/screening-submission.model';
import { SubmitScreeningRequestDto } from '../dtos/submit-screening-request.dto';

export function mapScreeningSubmitModelToDto(
  submission: ScreeningSubmissionModel
): SubmitScreeningRequestDto {
  return {
    sessionType: submission.sessionType,
    donationIntentId: submission.donationIntentId ?? null,
    answers: submission.answers.map((answer) => ({
      screeningQuestionId: answer.screeningQuestionId,
      answer: answer.answer,
      additionalText: answer.additionalText,
      conditionalDateValue: answer.conditionalDateValue
    }))
  };
}
