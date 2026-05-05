import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { ApiService } from '../../../../core/services/api.service';
import { ScreeningSessionType } from '../../domain/enums/screening-session-type.enum';
import { ScreeningQuestionResponseDto } from '../dtos/screening-question-response.dto';
import { SubmitScreeningRequestDto } from '../dtos/submit-screening-request.dto';
import { SubmitScreeningResponseDto } from '../dtos/submit-screening-response.dto';

@Injectable()
export class ScreeningApiService {
  private readonly api = inject(ApiService);

  private readonly questionsUrl = API_ENDPOINTS.screening.get;
  private readonly submitUrl = API_ENDPOINTS.screening.submit;

  getQuestions(
    sessionType: ScreeningSessionType,
    isForFemaleOnly: boolean
  ): Observable<ScreeningQuestionResponseDto[]> {
    return this.api.get<ScreeningQuestionResponseDto[]>(this.questionsUrl, {
      params: {
        sessionType,
        isForFemaleOnly
      }
    });
  }

  submitScreening(
    request: SubmitScreeningRequestDto
  ): Observable<SubmitScreeningResponseDto> {
    return this.api.post<SubmitScreeningRequestDto, SubmitScreeningResponseDto>(
      this.submitUrl,
      request
    );
  }
}
