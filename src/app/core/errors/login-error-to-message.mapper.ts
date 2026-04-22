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
