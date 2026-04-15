import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import {
  NetworkFailure,
  NotFoundFailure,
  ServerFailure,
  TimeoutFailure,
  UnauthorizedFailure,
  UnknownFailure
} from '../errors/failure';

export interface ApiErrorResponse {
  Title?: string;
  Status?: number;
  Message?: string;
  Code?: string;
  Errors?: string[];
}

export interface RequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?:
  | HttpParams
  | Record<
    string,
    string | number | boolean | readonly (string | number | boolean)[]
  >;
  timeoutMs?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly defaultTimeout = 15000;

  get<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.http.get<T>(url, {
      headers: options?.headers,
      params: options?.params
    }).pipe(
      timeout(options?.timeoutMs ?? this.defaultTimeout),
      catchError((error) => this.handleError(error))
    );
  }

  post<TRequest, TResponse>(
    url: string,
    body: TRequest,
    options?: RequestOptions
  ): Observable<TResponse> {
    return this.http.post<TResponse>(url, body, {
      headers: options?.headers,
      params: options?.params
    }).pipe(
      timeout(options?.timeoutMs ?? this.defaultTimeout),
      catchError((error) => this.handleError(error))
    );
  }

  put<TRequest, TResponse>(
    url: string,
    body: TRequest,
    options?: RequestOptions
  ): Observable<TResponse> {
    return this.http.put<TResponse>(url, body, {
      headers: options?.headers,
      params: options?.params
    }).pipe(
      timeout(options?.timeoutMs ?? this.defaultTimeout),
      catchError((error) => this.handleError(error))
    );
  }

  patch<TRequest, TResponse>(
    url: string,
    body: TRequest,
    options?: RequestOptions
  ): Observable<TResponse> {
    return this.http.patch<TResponse>(url, body, {
      headers: options?.headers,
      params: options?.params
    }).pipe(
      timeout(options?.timeoutMs ?? this.defaultTimeout),
      catchError((error) => this.handleError(error))
    );
  }

  delete<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.http.delete<T>(url, {
      headers: options?.headers,
      params: options?.params
    }).pipe(
      timeout(options?.timeoutMs ?? this.defaultTimeout),
      catchError((error) => this.handleError(error))
    );
  }

 private handleError(error: unknown): Observable<never> {
  if (error instanceof TimeoutError) {
    return throwError(() => new TimeoutFailure());
  }

  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new NetworkFailure(
        'Network error. Please check your internet connection.',
        error
      ));
    }

    const apiError = this.parseApiError(error);

    const message =
      apiError?.Message ||
      apiError?.Title ||
      error.message ||
      'Request failed.';

    const code = apiError?.Code;
    const errors = Array.isArray(apiError?.Errors) ? apiError.Errors : [];

    if (error.status === 404) {
      return throwError(() => new NotFoundFailure(
        message,
        code ?? 'NOT_FOUND',
        error
      ));
    }

    if (error.status === 401 || error.status === 403) {
      return throwError(() => new UnauthorizedFailure(
        message,
        code ?? 'UNAUTHORIZED',
        error
      ));
    }

    return throwError(() => new ServerFailure(
      message,
      error.status || apiError?.Status || 500,
      errors,
      code ?? 'SERVER_ERROR',
      error
    ));
  }

  return throwError(() => new UnknownFailure(
    'An unexpected error occurred.',
    error
  ));
}
  private parseApiError(error: HttpErrorResponse): ApiErrorResponse | null {
    if (!error.error) {
      return null;
    }

    if (typeof error.error === 'string') {
      try {
        return JSON.parse(error.error) as ApiErrorResponse;
      } catch {
        return {
          Message: error.error
        };
      }
    }

    if (typeof error.error === 'object') {
      return error.error as ApiErrorResponse;
    }

    return null;
  }
}
