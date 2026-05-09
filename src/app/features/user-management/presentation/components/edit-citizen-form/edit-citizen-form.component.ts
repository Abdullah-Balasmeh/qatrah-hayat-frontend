import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BloodTypeStatus } from '../../../../../core/enums/blood-type-status.enum';
import { EligibilityStatus } from '../../../../../core/enums/eligibility-status.enum';

import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { DropDownWithLabelComponent } from '../../../../../shared/ui/drop-down-with-label/drop-down-with-label.component';

import { UsersManagementFacade } from '../../facades/users-management.facade';
import { EditCitizenFormModel } from '../../view-models/edit-citizen-form.model';
import { UpdateCitizenModel } from '../../../domain/models/update-citizen.model';
import { BLOOD_TYPE_OPTIONS, BloodTypeEnum } from '../../../../../core/enums/blood-type-enum';

@Component({
  selector: 'app-edit-citizen-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextFieldComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent,
    DropDownWithLabelComponent
  ],
  templateUrl: './edit-citizen-form.component.html',
  styleUrl: './edit-citizen-form.component.css'
})
export class EditCitizenFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly facade = inject(UsersManagementFacade);

  readonly store = this.facade.store;

  readonly citizenId = signal<number | null>(null);
  readonly showSuccessMessage = signal(false);
  private readonly isFormPatched = signal(false);
  readonly bloodTypeOptions = BLOOD_TYPE_OPTIONS;
  readonly bloodTypeStatusOptions = [
    {
      value: BloodTypeStatus.Confirmed,
      label: 'Blood-Type-Status-Keys.CONFIRMED'
    },
    {
      value: BloodTypeStatus.Provisional,
      label: 'Blood-Type-Status-Keys.PROVISIONAL'
    }
  ];

  readonly eligibilityStatusOptions = [
    {
      value: EligibilityStatus.Eligible,
      label: 'Eligibility-Status-Keys.ELIGIBLE'
    },
    {
      value: EligibilityStatus.TempDeferred,
      label: 'Eligibility-Status-Keys.TEMP_DEFERRED'
    },
    {
      value: EligibilityStatus.PermDeferred,
      label: 'Eligibility-Status-Keys.PERM_DEFERRED'
    }
  ];

  readonly editCitizenForm = this.fb.group<EditCitizenFormModel>({
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email
    ]),

    phoneNumber: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^07\d{8}$/)
    ]),
    bloodType: this.fb.control<BloodTypeEnum | null>(null, [
      Validators.required
    ]),
    bloodTypeStatus: this.fb.control<BloodTypeStatus | null>(null, [
      Validators.required
    ]),

    eligibilityStatus: this.fb.control<EligibilityStatus | null>(null, [
      Validators.required
    ]),

    permanentDeferralReason: this.fb.nonNullable.control(''),

    isActive: this.fb.nonNullable.control(true)
  });

  constructor() {
    effect(() => {
      const citizen = this.store.selectedCitizen();

      if (!citizen || this.isFormPatched()) {
        return;
      }

      this.editCitizenForm.patchValue({
        email: citizen.email,
        phoneNumber: citizen.phoneNumber,
        bloodTypeStatus: citizen.bloodTypeStatus,
        bloodType: citizen.bloodType,
        eligibilityStatus: citizen.eligibilityStatus,
        permanentDeferralReason: citizen.permanentDeferralReason ?? '',
        isActive: citizen.isActive
      });

      this.isFormPatched.set(true);
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/admin/users']);
      return;
    }

    this.citizenId.set(id);
    this.facade.loadCitizenById(id);
  }
onBloodTypeChange(value: BloodTypeEnum | null): void {
  this.editCitizenForm.controls.bloodType.setValue(value);
  this.editCitizenForm.controls.bloodType.markAsTouched();
}
  onBloodTypeStatusChange(value: BloodTypeStatus | null): void {
    this.editCitizenForm.controls.bloodTypeStatus.setValue(value);
    this.editCitizenForm.controls.bloodTypeStatus.markAsTouched();
  }

  onEligibilityStatusChange(value: EligibilityStatus | null): void {
    this.editCitizenForm.controls.eligibilityStatus.setValue(value);
    this.editCitizenForm.controls.eligibilityStatus.markAsTouched();
  }

  onSubmit(): void {
    this.store.errorMessage.set(null);
    this.showSuccessMessage.set(false);

    this.editCitizenForm.markAllAsTouched();

    if (this.editCitizenForm.invalid) {
      return;
    }

    const id = this.citizenId();

    if (!id) {
      return;
    }

    const value = this.editCitizenForm.getRawValue();

   if (!value.bloodType || !value.bloodTypeStatus || !value.eligibilityStatus) {
  return;
}

    const request: UpdateCitizenModel = {
      email: value.email.trim(),
      phoneNumber: value.phoneNumber.trim(),
      bloodTypeStatus: value.bloodTypeStatus,
      eligibilityStatus: value.eligibilityStatus,
      permanentDeferralReason: value.permanentDeferralReason.trim() || null,
bloodType: value.bloodType,
      isActive: value.isActive
    };

    console.log('Request Blood Type:', request.bloodType);

    this.facade.updateCitizen(id, request, () => {
      this.showSuccessMessage.set(true);

      setTimeout(() => {
        this.router.navigate(['/admin/users']);
      }, 800);
    });
  }
}
