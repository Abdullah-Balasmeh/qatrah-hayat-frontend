import { Injectable, computed, signal } from '@angular/core';

import { ScreeningQueryContextModel } from '../../domain/models/screening-query-context.model';
import { ScreeningQuestionModel } from '../../domain/models/screening-question.model';
import { ScreeningResultModel } from '../../domain/models/screening-result.model';

@Injectable()
export class ScreeningStore {
  private readonly _context = signal<ScreeningQueryContextModel | null>(null);
  private readonly _questions = signal<ScreeningQuestionModel[]>([]);
  private readonly _loading = signal(false);
  private readonly _submitting = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _result = signal<ScreeningResultModel | null>(null);
  private readonly _resultMessageVisible = signal(false);

  readonly context = this._context.asReadonly();
  readonly questions = this._questions.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly submitting = this._submitting.asReadonly();
  readonly error = this._error.asReadonly();
  readonly result = this._result.asReadonly();
  readonly resultMessageVisible = this._resultMessageVisible.asReadonly();

  readonly hasContext = computed(() => this._context() !== null);
  readonly hasQuestions = computed(() => this._questions().length > 0);
  readonly hasError = computed(() => this._error() !== null);
  readonly hasResult = computed(() => this._result() !== null);

  setContext(context: ScreeningQueryContextModel | null): void {
    this._context.set(context);
  }

  setQuestions(questions: ScreeningQuestionModel[]): void {
    this._questions.set(questions);
  }

  setLoading(value: boolean): void {
    this._loading.set(value);
  }

  setSubmitting(value: boolean): void {
    this._submitting.set(value);
  }

  setError(message: string | null): void {
    this._error.set(message);
  }

  setResult(result: ScreeningResultModel | null): void {
    this._result.set(result);
  }

  setResultMessageVisible(value: boolean): void {
    this._resultMessageVisible.set(value);
  }

  clear(): void {
    this._context.set(null);
    this._questions.set([]);
    this._loading.set(false);
    this._submitting.set(false);
    this._error.set(null);
    this._result.set(null);
    this._resultMessageVisible.set(false);
  }
}
