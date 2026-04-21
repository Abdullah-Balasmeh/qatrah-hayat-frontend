import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BLOOD_TYPE_OPTIONS } from '../../../../../core/enums/blood-type-enum';
import { GENDER_OPTIONS } from '../../../../../core/enums/gender-enum';
import { UserRole, USER_ROLE_OPTIONS } from '../../../../../core/enums/user-role.enum';
import { AddStaffRequestModel } from '../../../domain/models/add-staff-request.model';
import { UsersManagementFacade } from '../../facades/users-management.facade';
import { AddStaffFormModel } from '../../view-models/add-staff-form.model';
import { MARITAL_STATUS_OPTIONS } from '../../../../../core/enums/marital-status-enum';

@Component({
  selector: 'app-add-staff-page',
  imports: [    CommonModule,
    ReactiveFormsModule,
    RouterLink],
  templateUrl: './add-staff-page.component.html',
  styleUrl: './add-staff-page.component.css'
})
export class AddStaffPageComponent {
 private readonly fb = inject(FormBuilder);
  readonly facade = inject(UsersManagementFacade);
  readonly store = this.facade.store;

  readonly bloodTypeOptions = BLOOD_TYPE_OPTIONS;
  readonly genderOptions = GENDER_OPTIONS;
  readonly maritalStatusOptions = MARITAL_STATUS_OPTIONS;

  readonly staffRoleOptions = [
    {
      value: UserRole.Doctor,
      label: USER_ROLE_OPTIONS[UserRole.Doctor]
    },
    {
      value: UserRole.Employee,
      label: USER_ROLE_OPTIONS[UserRole.Employee]
    },
    {
      value: UserRole.BranchManager,
      label: USER_ROLE_OPTIONS[UserRole.BranchManager]
    },
    {
      value: UserRole.Admin,
      label: USER_ROLE_OPTIONS[UserRole.Admin]
    }
  ];

  readonly addStaffForm = this.fb.group<AddStaffFormModel>({
    nationalId: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ]),
    fullNameAr: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(256)
    ]),
    fullNameEn: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(256)
    ]),
    dateOfBirth: this.fb.nonNullable.control('', [
      Validators.required
    ]),
    bloodType: this.fb.control(null, [
      Validators.required
    ]),
    gender: this.fb.control(null, [
      Validators.required
    ]),
    maritalStatus: this.fb.control(null, [
      Validators.required
    ]),
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^07\d{8}$/)
    ]),
    password: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: this.fb.nonNullable.control('', [
      Validators.required
    ]),
    staffRole: this.fb.control(null, [
      Validators.required
    ]),
    branchId: this.fb.control(null),
    hospitalId: this.fb.control(null)
  });

  readonly passwordsNotMatch = computed(() => {
    const password = this.addStaffForm.controls.password.value;
    const confirmPassword = this.addStaffForm.controls.confirmPassword.value;

    return Boolean(password && confirmPassword && password !== confirmPassword);
  });

  get nationalId() {
    return this.addStaffForm.controls.nationalId;
  }

  get fullNameAr() {
    return this.addStaffForm.controls.fullNameAr;
  }

  get fullNameEn() {
    return this.addStaffForm.controls.fullNameEn;
  }

  get dateOfBirth() {
    return this.addStaffForm.controls.dateOfBirth;
  }

  get bloodType() {
    return this.addStaffForm.controls.bloodType;
  }

  get gender() {
    return this.addStaffForm.controls.gender;
  }

  get maritalStatus() {
    return this.addStaffForm.controls.maritalStatus;
  }

  get email() {
    return this.addStaffForm.controls.email;
  }

  get phoneNumber() {
    return this.addStaffForm.controls.phoneNumber;
  }

  get password() {
    return this.addStaffForm.controls.password;
  }

  get confirmPassword() {
    return this.addStaffForm.controls.confirmPassword;
  }

  get staffRole() {
    return this.addStaffForm.controls.staffRole;
  }

  onSubmit(): void {
    this.addStaffForm.markAllAsTouched();

    if (this.addStaffForm.invalid || this.passwordsNotMatch()) {
      return;
    }

    const rawValue = this.addStaffForm.getRawValue();

    const request: AddStaffRequestModel = {
      nationalId: rawValue.nationalId.trim(),
      fullNameAr: rawValue.fullNameAr.trim(),
      fullNameEn: rawValue.fullNameEn.trim(),
      dateOfBirth: rawValue.dateOfBirth,
      bloodType: Number(rawValue.bloodType),
      gender: Number(rawValue.gender),
      maritalStatus: Number(rawValue.maritalStatus),
      email: rawValue.email.trim(),
      phoneNumber: rawValue.phoneNumber.trim(),
      password: rawValue.password,
      confirmPassword: rawValue.confirmPassword,
      staffRole: Number(rawValue.staffRole),
      branchId: rawValue.branchId,
      hospitalId: rawValue.hospitalId
    };

    this.facade.addStaff(request);
  }

  hasError(controlName: keyof AddStaffFormModel): boolean {
    const control = this.addStaffForm.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}
