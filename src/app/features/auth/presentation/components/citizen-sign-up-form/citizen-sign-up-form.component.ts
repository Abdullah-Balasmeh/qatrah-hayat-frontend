import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BloodTypeEnum } from '../../../../../core/enums/blood-type-enum';
import { GenderEnum } from '../../../../../core/enums/gender-enum';
import { MaritalStatusEnum } from '../../../../../core/enums/marital-status-enum';
import { Failure, NotFoundFailure } from '../../../../../core/errors/failure';

import { matchFieldsValidator } from '../../../../../shared/validators/password-match.validator';
import { formatDateForInput } from '../../../../../core/utils/helper/format.date.for.input.helper';
import { getBloodTypeLabel } from '../../../../../core/utils/helper/get.blood.type.label.helper';
import { getGenderLabel } from '../../../../../core/utils/helper/get.gender.labe.helper';

import { CitizenService } from '../../../data/services/citizen.service';
import { AuthFacade } from '../../facades/auth.facade';
import { SignUpFormModel } from '../../view-models/sign-up-form.model';
import { CitizenResponseModel } from '../../../domain/models/citizen-response.model';
import { mapSignUpFormValueToRegisterRequestModel } from '../../../data/mappers/sign-up-form-value-to-register-request-model';
import { TextFieldComponent } from "../../../../../shared/ui/text-field/text-field.component";
import { FormErrorMessageComponent } from "../../../../../shared/ui/form-error-message/form-error-message.component";
import { AppPrimaryButtonComponent } from "../../../../../shared/ui/app-primary-button/app-primary-button.component";
import { PasswordTextFieldComponent } from "../../../../../shared/ui/password-text-field/password-text-field.component";
import { CheckBoxInputComponent } from "../../../../../shared/ui/check-box-input/check-box-input.component";
import { MaritalStatusRadioGroupComponent } from "../marital-status-radio-group/marital-status-radio-group.component";

@Component({
  selector: 'app-citizen-sign-up-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, TextFieldComponent, FormErrorMessageComponent, AppPrimaryButtonComponent, PasswordTextFieldComponent, CheckBoxInputComponent, MaritalStatusRadioGroupComponent],
  templateUrl: './citizen-sign-up-form.component.html',
  styleUrl: './citizen-sign-up-form.component.css'
})
export class CitizenSignUpFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly citizenService = inject(CitizenService);
  private readonly authFacade = inject(AuthFacade);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = this.authFacade.loading;
  readonly serverErrorMessage = this.authFacade.error;

  readonly isFetchingCitizenData = signal(false);
  readonly isCitizenVerified = signal(false);
  readonly showSuccessMessage = signal(false);
  readonly civilStatusErrorMessage = signal('');

  readonly signUpForm: FormGroup<SignUpFormModel> = this.fb.group(
    {
      nationalId: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d{10}$/)
      ]),
      fullNameAr: this.fb.nonNullable.control('', [
        Validators.minLength(3),
        Validators.maxLength(256)
      ]),
      fullNameEn: this.fb.nonNullable.control('', [
        Validators.minLength(3),
        Validators.maxLength(256)
      ]),
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)
      ]),
      phoneNumber: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^07\d{8}$/)
      ]),
      bloodType: this.fb.control<BloodTypeEnum | null>(null),
      bloodTypeDisplay: this.fb.nonNullable.control(''),
      dateOfBirth: this.fb.nonNullable.control(''),
      gender: this.fb.control<GenderEnum | null>(null),
      genderDisplay: this.fb.nonNullable.control(''),
      address: this.fb.nonNullable.control('', [
        Validators.minLength(3),
        Validators.maxLength(255)
      ]),
      jobTitle: this.fb.nonNullable.control('', [
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      maritalStatus: this.fb.control<MaritalStatusEnum | null>(null, [
        Validators.required
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(64),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,64}$/)
      ]),
      confirmPassword: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(64)
      ]),
      iAgree: this.fb.nonNullable.control(false, [Validators.requiredTrue]),
      iConfirm: this.fb.nonNullable.control(false, [Validators.requiredTrue])
    },
    {
      validators: [matchFieldsValidator('password', 'confirmPassword', 'passwordMismatch')]
    }
  );

  constructor() {
    this.watchNationalIdChanges();
  }

  onFetchCitizenData(): void {
    this.civilStatusErrorMessage.set('');
    this.isCitizenVerified.set(false);

    const nationalIdControl = this.signUpForm.controls.nationalId;
    nationalIdControl.markAsTouched();

    if (nationalIdControl.invalid) {
      return;
    }

    const nationalId = nationalIdControl.getRawValue();
    this.isFetchingCitizenData.set(true);

    this.citizenService.getCivilStatus(nationalId)
      .pipe(
        finalize(() => this.isFetchingCitizenData.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response: CitizenResponseModel) => {
          this.fillCitizenData(response);
          this.isCitizenVerified.set(true);
        },
        error: (error: Failure) => {
          if (error instanceof NotFoundFailure) {
            this.civilStatusErrorMessage.set(
              this.translate.instant('Signup-Keys.NATIONAL_ID_NOT_FOUND')
            );
          } else {
            this.civilStatusErrorMessage.set(
              this.translate.instant('Signup-Keys.NATIONAL_ID_SERVER_ERROR')
            );
          }
        }
      });
  }

  onSubmit(): void {
    this.civilStatusErrorMessage.set('');
    this.showSuccessMessage.set(false);

    if (!this.isCitizenVerified()) {
      this.civilStatusErrorMessage.set(
        this.translate.instant('Signup-Keys.NATIONAL_REGISTRY_VERIFICATION')
      );
      return;
    }

    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) {
      return;
    }

    const formValue = this.signUpForm.getRawValue();
    const request = mapSignUpFormValueToRegisterRequestModel(formValue);

    this.authFacade.registerCitizen(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.clearData();
          this.showSuccessMessage.set(true);

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: () => {
          // no-op: facade already set translated error in store
        }
      });
  }

  private fillCitizenData(response: CitizenResponseModel): void {
    const bloodType = response.bloodType as BloodTypeEnum;
    const gender = response.gender as GenderEnum;

    this.signUpForm.patchValue({
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
    this.signUpForm.controls.nationalId.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isCitizenVerified.set(false);
        this.civilStatusErrorMessage.set('');

        this.signUpForm.patchValue({
          fullNameAr: '',
          fullNameEn: '',
          dateOfBirth: '',
          bloodType: null,
          bloodTypeDisplay: '',
          gender: null,
          genderDisplay: ''
        });
      });
  }

  private clearData(): void {
    this.signUpForm.reset({
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
      iAgree: false,
      iConfirm: false
    });

    this.isCitizenVerified.set(false);
    this.civilStatusErrorMessage.set('');
  }
}
