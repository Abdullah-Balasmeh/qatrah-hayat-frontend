import { RegisterRequestModel } from '../../domain/models/register-request.model';
import { SignUpFormValue } from '../../presentation/view-models/sign-up-form-value';
export function mapSignUpFormValueToRegisterRequestModel(
  formValue: SignUpFormValue
): RegisterRequestModel {
  return {
    nationalId: formValue.nationalId,
    fullNameAr: formValue.fullNameAr,
    fullNameEn: formValue.fullNameEn,
    dateOfBirth: formValue.dateOfBirth,
    bloodType: formValue.bloodType!,
    gender: formValue.gender!,
    maritalStatus: formValue.maritalStatus!,
    email: formValue.email,
    phoneNumber: formValue.phoneNumber,
    jobTitle: formValue.jobTitle,
    address: formValue.address,
    password: formValue.password,
    confirmPassword: formValue.confirmPassword,
    iAgree: formValue.iAgree,
    iConfirm: formValue.iConfirm
  };
}
