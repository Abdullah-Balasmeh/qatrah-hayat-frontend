export abstract class Failure extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NetworkFailure extends Failure {
  constructor(
    message = 'Network error. Please check your internet connection.',
    originalError?: unknown
  ) {
    super(message, 'NETWORK_ERROR', originalError);
  }
}

export class TimeoutFailure extends Failure {
  constructor(
    message = 'The request timed out.',
    originalError?: unknown
  ) {
    super(message, 'TIMEOUT', originalError);
  }
}

export class UnauthorizedFailure extends Failure {
  constructor(
    message = 'You are not authorized to perform this action.',
    code = 'UNAUTHORIZED',
    originalError?: unknown
  ) {
    super(message, code, originalError);
  }
}

export class NotFoundFailure extends Failure {
  constructor(
    message = 'The requested resource was not found.',
    code = 'NOT_FOUND',
    originalError?: unknown
  ) {
    super(message, code, originalError);
  }
}

export class ServerFailure extends Failure {
  constructor(
    message = 'Server error occurred.',
    public readonly statusCode: number = 500,
    public readonly errors: string[] = [],
    code = 'SERVER_ERROR',
    originalError?: unknown
  ) {
    super(message, code, originalError);
  }
}

export class UnknownFailure extends Failure {
  constructor(
    message = 'An unexpected error occurred.',
    originalError?: unknown
  ) {
    super(message, 'UNKNOWN_ERROR', originalError);
  }
}
