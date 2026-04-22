export interface ResetPasswordRequestDto {
  email: string;
  resetSessionToken: string;
  newPassword: string;
  confirmNewPassword: string;
}
