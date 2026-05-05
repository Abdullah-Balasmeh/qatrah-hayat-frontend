import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ScreeningQueryContextModel } from '../../domain/models/screening-query-context.model';
import { ScreeningQuestionModel } from '../../domain/models/screening-question.model';
import { ScreeningResultModel } from '../../domain/models/screening-result.model';
import { ScreeningSubmissionModel } from '../../domain/models/screening-submission.model';
import { ScreeningRepository } from '../../domain/repositories/screening.repository';
import { mapScreeningQuestionDtoToModel } from '../mappers/screening-question-dto-to-model.mapper';
import { mapScreeningSubmitModelToDto } from '../mappers/screening-submit-model-to-dto.mapper';
import { mapScreeningSubmitResponseDtoToModel } from '../mappers/screening-submit-response-dto-to-model.mapper';
import { ScreeningApiService } from '../services/screening-api.service';

@Injectable()
export class ScreeningRepositoryImpl implements ScreeningRepository {
  private readonly api = inject(ScreeningApiService);

  getQuestions(
    context: ScreeningQueryContextModel
  ): Observable<ScreeningQuestionModel[]> {
    return this.api.getQuestions(
      context.sessionType,
      context.isForFemaleOnly
    ).pipe(
      map((questions) => questions.map(mapScreeningQuestionDtoToModel))
    );
  }

  submitScreening(
    submission: ScreeningSubmissionModel
  ): Observable<ScreeningResultModel> {
    const dto = mapScreeningSubmitModelToDto(submission);

    return this.api.submitScreening(dto).pipe(
      map(mapScreeningSubmitResponseDtoToModel)
    );
  }
}
