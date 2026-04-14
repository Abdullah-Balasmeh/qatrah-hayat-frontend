import { RegisterRequestModel } from "../models/register-request.model";
import { SignUpFormValue } from "../models/sign-up-form-value.model";


export function mapSignUpFormToRegisterRequest(
  formValue: SignUpFormValue
): RegisterRequestModel {
  return {
    nationalId: formValue.nationalId.trim(),
    fullNameAr: formValue.fullNameAr.trim(),
    fullNameEn: formValue.fullNameEn.trim(),
    dateOfBirth: new Date(formValue.dateOfBirth).toISOString(),
    bloodType: Number(formValue.bloodType),
    gender: Number(formValue.gender),
    maritalStatus: Number(formValue.maritalStatus),
    email: formValue.email.trim().toLowerCase(),
    phoneNumber: formValue.phoneNumber.trim(),
    iAgree: formValue.iAgree,
    iConfirm: formValue.iConfirm,
    jobTitle: formValue.jobTitle.trim(),
    address: formValue.address.trim(),
    password: formValue.password,
    confirmPassword: formValue.confirmPassword
  };
}
