import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { BloodTypeEnum } from '../../../../../core/enums/blood-type-enum';
import { GenderEnum } from '../../../../../core/enums/gender-enum';
import { MaritalStatusEnum } from '../../../../../core/enums/marital-status-enum';
import { Failure, NotFoundFailure } from '../../../../../core/errors/failure';
import { formatDateForInput } from '../../../../../core/utils/helper/format.date.for.input.helper';
import { getBloodTypeLabel } from '../../../../../core/utils/helper/get.blood.type.label.helper';
import { getGenderLabel } from '../../../../../core/utils/helper/get.gender.labe.helper';
import { matchFieldsValidator } from '../../../../../shared/validators/password-match.validator';

import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { PasswordTextFieldComponent } from '../../../../../shared/ui/password-text-field/password-text-field.component';
import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { MaritalStatusRadioGroupComponent } from '../../../../auth/presentation/components/marital-status-radio-group/marital-status-radio-group.component';

import { AddStaffFormModel } from '../../view-models/add-staff-form.model';
import {
  USER_ROLE_OPTIONS,
  UserRole
} from '../../../../../core/enums/user-role.enum';
import { UsersManagementFacade } from '../../facades/users-management.facade';
import { CitizenLookupModel } from '../../../domain/models/citizen-lookup.model';
import { CreateStaffFromRegistryModel } from '../../../domain/models/create-staff-from-registry.model';
import { PromoteCitizenToStaffModel } from '../../../domain/models/promote-citizen-to-staff.model';
import { DropDownWithLabelComponent } from "../../../../../shared/ui/drop-down-with-label/drop-down-with-label.component";
import { LanguageService } from '../../../../../core/services/language.service';
import { DropdownOption } from '../../../../../shared/ui/app-filter-button/app-filter-button.component';

type StaffCreationMode = 'none' | 'createNewUser' | 'promoteExistingCitizen' | 'alreadyStaff';

@Component({
  selector: 'app-add-staff-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextFieldComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent,
    PasswordTextFieldComponent,
    MaritalStatusRadioGroupComponent,
    DropDownWithLabelComponent
],
  templateUrl: './add-staff-form.component.html',
  styleUrl: './add-staff-form.component.css'
})
export class AddStaffFormComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly facade = inject(UsersManagementFacade);
  readonly store = this.facade.store;
  readonly UserRole = UserRole;
  private readonly languageService = inject(LanguageService);

readonly isArabic = computed(() => {
  return this.languageService.currentLangSignal() === 'ar';
});

readonly hospitalOptions = computed<DropdownOption<number>[]>(() => {
  return this.store.activeHospitals().map(hospital => ({
    value: hospital.id,
    label: this.isArabic()
      ? hospital.hospitalNameAr
      : hospital.hospitalNameEn
  }));
});

readonly branchOptions = computed<DropdownOption<number>[]>(() => {
  return this.store.activeBranches().map(branch => ({
    value: branch.id,
    label: this.isArabic()
      ? branch.branchNameAr
      : branch.branchNameEn
  }));
});
 ngOnInit(): void {
  this.facade.loadActiveBranches();
  this.facade.loadActiveHospitals();
}
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

  readonly isLoading = this.store.loading;
  readonly serverErrorMessage = this.store.errorMessage;

  readonly isFetchingCitizenData = signal(false);
  readonly isCitizenVerified = signal(false);
  readonly showSuccessMessage = signal(false);
  readonly civilStatusErrorMessage = signal('');

  readonly staffCreationMode = signal<StaffCreationMode>('none');
  readonly selectedCitizenUserId = signal<number | null>(null);

  readonly isNewUserMode = computed(
    () => this.staffCreationMode() === 'createNewUser'
  );

  readonly isPromoteMode = computed(
    () => this.staffCreationMode() === 'promoteExistingCitizen'
  );

  readonly isAlreadyStaffMode = computed(
    () => this.staffCreationMode() === 'alreadyStaff'
  );

  readonly addStaffForm: FormGroup<AddStaffFormModel> = this.fb.group(
    {
      nationalId: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d{10}$/)
      ]),

      fullNameAr: this.fb.nonNullable.control(''),
      fullNameEn: this.fb.nonNullable.control(''),

      email: this.fb.nonNullable.control(''),
      phoneNumber: this.fb.nonNullable.control(''),

      bloodType: this.fb.control<BloodTypeEnum | null>(null),
      bloodTypeDisplay: this.fb.nonNullable.control(''),

      dateOfBirth: this.fb.nonNullable.control(''),

      gender: this.fb.control<GenderEnum | null>(null),
      genderDisplay: this.fb.nonNullable.control(''),

      address: this.fb.nonNullable.control(''),
      jobTitle: this.fb.nonNullable.control(''),

      maritalStatus: this.fb.control<MaritalStatusEnum | null>(null),

      password: this.fb.nonNullable.control(''),
      confirmPassword: this.fb.nonNullable.control(''),

      staffRole: this.fb.control<UserRole | null>(null, [
        Validators.required
      ]),

      branchId: this.fb.control<number | null>(null),
      hospitalId: this.fb.control<number | null>(null),
    },
    {
      validators: [
        matchFieldsValidator('password', 'confirmPassword', 'passwordMismatch')
      ]
    }
  );

  constructor() {
    this.watchNationalIdChanges();
    this.watchStaffRoleChanges();
    this.applyModeValidators('none');
  }

  onFetchCitizenData(): void {
    this.civilStatusErrorMessage.set('');
    this.isCitizenVerified.set(false);
    this.staffCreationMode.set('none');
    this.selectedCitizenUserId.set(null);
    this.showSuccessMessage.set(false);

    const nationalIdControl = this.addStaffForm.controls.nationalId;
    nationalIdControl.markAsTouched();

    if (nationalIdControl.invalid) {
      return;
    }

    const nationalId = nationalIdControl.getRawValue().trim();

    this.isFetchingCitizenData.set(true);

    this.facade.lookupCitizenByNationalId(nationalId)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response: CitizenLookupModel) => {
          this.isFetchingCitizenData.set(false);

          this.fillCitizenData(response);
          this.handleLookupResult(response);
        },
        error: (error: Failure) => {
          this.isFetchingCitizenData.set(false);
          this.handleLookupError(error);
        }
      });
  }

onStaffRoleChange(role: UserRole | null): void {
  this.addStaffForm.controls.staffRole.setValue(role);
  this.addStaffForm.controls.staffRole.markAsTouched();
  this.addStaffForm.controls.staffRole.markAsDirty();

  this.addStaffForm.patchValue({
    branchId: null,
    hospitalId: null
  });

  this.applyLocationValidators();
}
  onHospitalChange(hospitalId: number | null): void {
  this.addStaffForm.controls.hospitalId.setValue(hospitalId);
  this.addStaffForm.controls.hospitalId.markAsDirty();
}

onBranchChange(branchId: number | null): void {
  this.addStaffForm.controls.branchId.setValue(branchId);
  this.addStaffForm.controls.branchId.markAsDirty();
}

  onSubmit(): void {
    this.civilStatusErrorMessage.set('');
    this.showSuccessMessage.set(false);
    this.store.errorMessage.set(null);

    if (!this.isCitizenVerified()) {
      this.civilStatusErrorMessage.set(
        this.translate.instant('Signup-Keys.NATIONAL_REGISTRY_VERIFICATION')
      );
      return;
    }

    if (this.isAlreadyStaffMode()) {
      this.civilStatusErrorMessage.set(
        this.translate.instant('Add-Staff-Keys.USER_ALREADY_STAFF')
      );
      return;
    }

    this.applyLocationValidators();
    this.addStaffForm.markAllAsTouched();

    if (this.addStaffForm.invalid) {
      return;
    }

    if (this.isNewUserMode()) {
      this.createStaffFromNationalRegistry();
      return;
    }

    if (this.isPromoteMode()) {
      this.promoteCitizenToStaff();
      return;
    }
  }

  private createStaffFromNationalRegistry(): void {
    const formValue = this.addStaffForm.getRawValue();

    if (
      formValue.maritalStatus === null ||
      formValue.staffRole === null
    ) {
      return;
    }

    const request: CreateStaffFromRegistryModel = {
      nationalId: formValue.nationalId.trim(),
      email: formValue.email.trim(),
      phoneNumber: formValue.phoneNumber.trim(),
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      maritalStatus: formValue.maritalStatus,
      staffRole: formValue.staffRole,
      branchId: this.getBranchIdForRole(formValue.staffRole, formValue.branchId),
      hospitalId: this.getHospitalIdForRole(formValue.staffRole, formValue.hospitalId),
    };

    this.facade.createStaffFromNationalRegistry(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.showSuccessMessage.set(true);
          this.facade.navigateToUsersManagement();
        },
        error: (error: Failure) => {
          this.store.errorMessage.set(
            error?.message ?? this.translate.instant('Add-Staff-Keys.FAILED_TO_ADD_STAFF')
          );
        }
      });
  }

  private promoteCitizenToStaff(): void {
    const userId = this.selectedCitizenUserId();

    if (userId === null) {
      this.civilStatusErrorMessage.set(
        this.translate.instant('Add-Staff-Keys.USER_ID_NOT_FOUND')
      );
      return;
    }

    const formValue = this.addStaffForm.getRawValue();

    if (formValue.staffRole === null) {
      return;
    }

    const request: PromoteCitizenToStaffModel = {
      staffRole: formValue.staffRole,
      branchId: this.getBranchIdForRole(formValue.staffRole, formValue.branchId),
      hospitalId: this.getHospitalIdForRole(formValue.staffRole, formValue.hospitalId),
    };

    this.facade.promoteCitizenToStaff(userId, request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.showSuccessMessage.set(true);
          this.facade.navigateToUsersManagement();
        },
        error: (error: Failure) => {
          this.store.errorMessage.set(
            error?.message ?? this.translate.instant('Add-Staff-Keys.FAILED_TO_PROMOTE_CITIZEN')
          );
        }
      });
  }

  private handleLookupResult(response: CitizenLookupModel): void {
    this.isCitizenVerified.set(true);
    this.selectedCitizenUserId.set(response.userId);

    if (response.isUser && response.isStaff) {
      this.staffCreationMode.set('alreadyStaff');
      this.applyModeValidators('alreadyStaff');

      this.civilStatusErrorMessage.set(
        this.translate.instant('Add-Staff-Keys.USER_ALREADY_STAFF')
      );

      return;
    }

    if (response.isUser && !response.isStaff) {
      this.staffCreationMode.set('promoteExistingCitizen');
      this.applyModeValidators('promoteExistingCitizen');
      return;
    }

    this.staffCreationMode.set('createNewUser');
    this.applyModeValidators('createNewUser');
  }

  private handleLookupError(error: Failure): void {
    if (error instanceof NotFoundFailure || error.code === 'NATIONAL_ID_NOT_FOUND') {
      this.civilStatusErrorMessage.set(
        this.translate.instant('Signup-Keys.NATIONAL_ID_NOT_FOUND')
      );
      return;
    }

    this.civilStatusErrorMessage.set(
      this.translate.instant('Signup-Keys.NATIONAL_ID_SERVER_ERROR')
    );
  }

  private fillCitizenData(response: CitizenLookupModel): void {
    const bloodType = response.bloodType as BloodTypeEnum;
    const gender = response.gender as GenderEnum;

    this.addStaffForm.patchValue({
      nationalId: response.nationalId,
      fullNameAr: response.fullNameAr,
      fullNameEn: response.fullNameEn,
      dateOfBirth: formatDateForInput(response.dateOfBirth),
      bloodType,
      bloodTypeDisplay: getBloodTypeLabel(bloodType),
      gender,
      genderDisplay: this.translate.instant(getGenderLabel(gender))
    });
  }

  private watchNationalIdChanges(): void {
    this.addStaffForm.controls.nationalId.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isCitizenVerified.set(false);
        this.civilStatusErrorMessage.set('');
        this.staffCreationMode.set('none');
        this.selectedCitizenUserId.set(null);

        this.addStaffForm.patchValue({
          fullNameAr: '',
          fullNameEn: '',
          dateOfBirth: '',
          bloodType: null,
          bloodTypeDisplay: '',
          gender: null,
          genderDisplay: '',

          email: '',
          phoneNumber: '',
          maritalStatus: null,
          password: '',
          confirmPassword: '',
          staffRole: null,
          branchId: null,
          hospitalId: null
        });

        this.applyModeValidators('none');
      });
  }

  private watchStaffRoleChanges(): void {
    this.addStaffForm.controls.staffRole.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.applyLocationValidators();
      });
  }

  private applyModeValidators(mode: StaffCreationMode): void {
    const emailControl = this.addStaffForm.controls.email;
    const phoneControl = this.addStaffForm.controls.phoneNumber;
    const maritalStatusControl = this.addStaffForm.controls.maritalStatus;
    const passwordControl = this.addStaffForm.controls.password;
    const confirmPasswordControl = this.addStaffForm.controls.confirmPassword;

    emailControl.clearValidators();
    phoneControl.clearValidators();
    maritalStatusControl.clearValidators();
    passwordControl.clearValidators();
    confirmPasswordControl.clearValidators();

    if (mode === 'createNewUser') {
      emailControl.setValidators([
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)
      ]);

      phoneControl.setValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^07\d{8}$/)
      ]);

      maritalStatusControl.setValidators([
        Validators.required
      ]);

      passwordControl.setValidators([
        Validators.required,
        Validators.maxLength(64),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,64}$/)
      ]);

      confirmPasswordControl.setValidators([
        Validators.required,
        Validators.maxLength(64)
      ]);
    }

    emailControl.updateValueAndValidity();
    phoneControl.updateValueAndValidity();
    maritalStatusControl.updateValueAndValidity();
    passwordControl.updateValueAndValidity();
    confirmPasswordControl.updateValueAndValidity();

    this.applyLocationValidators();
  }

private applyLocationValidators(): void {
  const staffRole = this.addStaffForm.controls.staffRole.value;

  const branchControl = this.addStaffForm.controls.branchId;
  const hospitalControl = this.addStaffForm.controls.hospitalId;

  branchControl.clearValidators();
  hospitalControl.clearValidators();

  if (staffRole === UserRole.Doctor) {
    hospitalControl.setValidators([Validators.required]);
    branchControl.setValue(null);
  }

  if (staffRole === UserRole.Employee) {
    branchControl.setValidators([Validators.required]);
    hospitalControl.setValue(null);
  }

  if (
    staffRole === UserRole.BranchManager ||
    staffRole === UserRole.Admin ||
    staffRole === null
  ) {
    branchControl.setValue(null);
    hospitalControl.setValue(null);
  }

  branchControl.updateValueAndValidity();
  hospitalControl.updateValueAndValidity();
}
private getBranchIdForRole(
  staffRole: UserRole,
  branchId: number | null
): number | null {
  return staffRole === UserRole.Employee
    ? branchId
    : null;
}

private getHospitalIdForRole(
  staffRole: UserRole,
  hospitalId: number | null
): number | null {
  return staffRole === UserRole.Doctor
    ? hospitalId
    : null;
}

  clearData(): void {
    this.addStaffForm.reset({
      nationalId: '',
      fullNameAr: '',
      fullNameEn: '',
      email: '',
      phoneNumber: '',
      bloodType: null,
      bloodTypeDisplay: '',
      dateOfBirth: '',
      gender: null,
      genderDisplay: '',
      address: '',
      jobTitle: '',
      maritalStatus: null,
      password: '',
      confirmPassword: '',
      staffRole: null,
      branchId: null,
      hospitalId: null
    });

    this.isCitizenVerified.set(false);
    this.civilStatusErrorMessage.set('');
    this.staffCreationMode.set('none');
    this.selectedCitizenUserId.set(null);
    this.showSuccessMessage.set(false);

    this.applyModeValidators('none');
  }
}
