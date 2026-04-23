import { TranslateService } from "@ngx-translate/core";
import { Failure } from "./failure";

export function mapLoginErrorToMessage(error: Failure,translate : TranslateService): string {
  switch (error.code) {
    case 'AUTH_INVALID_CREDENTIALS':
      return translate.instant('Login-Keys.INVALID_CREDENTIALS');

    case 'AUTH_ACCOUNT_INACTIVE':
      return translate.instant('Login-Keys.INACTIVE_ACCOUNT');

    default:
      return translate.instant('Login-Keys.GENERIC_ERROR_LOGIN');
  }
}


export function mapForgotPasswordErrorToMessage(error: Failure , translate : TranslateService): string {
  switch (error.code) {
    case 'EMAIL_SENDING_FAILED':
      return translate.instant('ForgotPassword-Keys.EMAIL_SENDING_FAILED');

    default:
      return translate.instant('ForgotPassword-Keys.GENERIC_ERROR');
  }
}


export function mapVerifyOtpErrorToMessage(error: Failure , translate : TranslateService): string {
  switch (error.code) {
    case 'USER_NOT_FOUND':
      return translate.instant('Login-Keys.USER_NOT_FOUND');
    case 'AUTH_ACCOUNT_INACTIVE':
      return translate.instant('Login-Keys.INACTIVE_ACCOUNT');
    case 'INVALID_OTP':
      return translate.instant('ResetOtp-Keys.INVALID_OTP');

    case 'OTP_EXPIRED':
      return translate.instant('ResetOtp-Keys.OTP_EXPIRED');

    case 'OTP_TOO_MANY_ATTEMPTS':
      return translate.instant('ResetOtp-Keys.OTP_TOO_MANY_ATTEMPTS');

    default:
      return translate.instant('ResetOtp-Keys.GENERIC_ERROR');
  }
}


export function mapResetPasswordErrorToMessage(error: Failure,translate : TranslateService): string {
  switch (error.code) {
    case 'PASSWORD_CONFIRMATION_MISMATCH':
      return translate.instant('ResetPassword-Keys.PASSWORDS_DO_NOT_MATCH');

    case 'INVALID_PASSWORD_RESET_REQUEST':
      return translate.instant('ResetPassword-Keys.INVALID_PASSWORD_RESET_REQUEST');

    case 'PASSWORD_RESET_SESSION_EXPIRED':
      return translate.instant('ResetPassword-Keys.PASSWORD_RESET_SESSION_EXPIRED');

    case 'PASSWORD_RESET_FAILED':
      return translate.instant('ResetPassword-Keys.PASSWORD_RESET_FAILED');

    default:
      return translate.instant('ResetPassword-Keys.GENERIC_ERROR');
  }
}
