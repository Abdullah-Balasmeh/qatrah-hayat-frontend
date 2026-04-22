export interface ResetPasswordRequestModel {
  email: string;
  resetSessionToken: string;
  newPassword: string;
  confirmNewPassword: string;
}
