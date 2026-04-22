import { TranslateService } from "@ngx-translate/core";
import { Failure } from "./failure";

export function mapRegisterErrorToMessage(error: Failure , translate : TranslateService): string {
  switch (error.code) {
    case 'NON_JORDANIAN_CITIZEN':
      return translate.instant('Signup-Keys.NON_JORDANIAN_CITIZEN');

    case 'EMAIL_ALREADY_REGISTERED':
      return translate.instant('Signup-Keys.EMAIL_ALREADY_REGISTERED');

    case 'NATIONAL_ID_ALREADY_REGISTERED':
      return translate.instant('Signup-Keys.NATIONAL_ID_ALREADY_REGISTERED');

    case 'NATIONAL_ID_NOT_FOUND':
      return translate.instant('Signup-Keys.NATIONAL_ID_NOT_FOUND');
    case 'PHONE_ALREADY_REGISTERED':
      return translate.instant('Signup-Keys.PHONE_ALREADY_REGISTERED');

    case 'TERMS_AND_CONDITIONS_REQUIRED':
    case 'REGISTRATION_FAILED':
    case 'ROLE_ASSIGNMENT_FAILED':
      return translate.instant('Signup-Keys.GENERIC_ERROR_SIGNUP');

    default:
      return translate.instant('Signup-Keys.GENERIC_ERROR_SIGNUP');
  }
}


export function mapFetchCitizenErrorToMessage(error: Failure , translate : TranslateService): string {
  switch (error.code) {
    case 'NATIONAL_ID_NOT_FOUND':
      return translate.instant('Signup-Keys.NATIONAL_ID_NOT_FOUND');

    default:
      return translate.instant('Signup-Keys.GENERIC_ERROR_SIGNUP');
  }
}




