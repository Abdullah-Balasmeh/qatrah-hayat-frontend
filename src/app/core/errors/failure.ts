export abstract class Failure extends Error {
  constructor(
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NetworkFailure extends Failure {
  constructor(message = 'Network error. Please check your internet connection.', originalError?: unknown) {
    super(message, originalError);
  }
}

export class TimeoutFailure extends Failure {
  constructor(message = 'The request timed out.', originalError?: unknown) {
    super(message, originalError);
  }
}

export class UnauthorizedFailure extends Failure {
  constructor(message = 'You are not authorized to perform this action.', originalError?: unknown) {
    super(message, originalError);
  }
}

export class NotFoundFailure extends Failure {
  constructor(message = 'The requested resource was not found.', originalError?: unknown) {
    super(message, originalError);
  }
}

export class ServerFailure extends Failure {
  constructor(
    message = 'Server error occurred.',
    public readonly statusCode: number = 500,
    public readonly errors: string[] = [],
    originalError?: unknown
  ) {
    super(message, originalError);
  }
}

export class UnknownFailure extends Failure {
  constructor(message = 'An unexpected error occurred.', originalError?: unknown) {
    super(message, originalError);
  }
}
