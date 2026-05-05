import { Observable } from 'rxjs';
import { ScreeningQueryContextModel } from '../models/screening-query-context.model';
import { ScreeningQuestionModel } from '../models/screening-question.model';
import { ScreeningResultModel } from '../models/screening-result.model';
import { ScreeningSubmissionModel } from '../models/screening-submission.model';

export abstract class ScreeningRepository {
  abstract getQuestions(
    context: ScreeningQueryContextModel
  ): Observable<ScreeningQuestionModel[]>;

  abstract submitScreening(
    submission: ScreeningSubmissionModel
  ): Observable<ScreeningResultModel>;
}
