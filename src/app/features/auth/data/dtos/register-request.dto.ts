export interface RegisterRequestDto {
  nationalId: string;
  fullNameAr: string;
  fullNameEn: string;
  dateOfBirth: string;
  bloodType: number;
  gender: number;
  maritalStatus: number;
  email: string;
  phoneNumber: string;
  iConfirm: boolean;
  iAgree: boolean;
  jobTitle?: string;
  address?: string;
  password: string;
  confirmPassword: string;
}
