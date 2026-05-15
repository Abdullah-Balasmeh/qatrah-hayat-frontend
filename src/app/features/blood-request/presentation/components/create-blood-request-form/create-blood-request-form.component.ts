import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageService } from '../../../../../core/services/language.service';

import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { DropDownWithLabelComponent } from '../../../../../shared/ui/drop-down-with-label/drop-down-with-label.component';
import { DropdownOption } from '../../../../../shared/ui/app-filter-button/app-filter-button.component';

import { BloodRequestFacade } from '../../facades/blood-request.facade';

import {
  RELATIONSHIP_TYPE_OPTIONS,
  RelationshipType
} from '../../../domain/enums/relationship-type.enum';

import { CreateBloodRequestModel } from '../../../domain/models/create-blood-request.model';

@Component({
  selector: 'app-create-blood-request-form',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    TranslateModule,
    TextFieldComponent,
    DropDownWithLabelComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent
  ],
  templateUrl: './create-blood-request-form.component.html',
  styleUrl: './create-blood-request-form.component.css'
})
export class CreateBloodRequestFormComponent implements OnInit {
  @Input({ required: true }) relationshipType!: RelationshipType;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly facade = inject(BloodRequestFacade);
  private readonly languageService = inject(LanguageService);

  readonly store = this.facade.store;

  readonly showSuccessMessage = signal(false);
  readonly beneficiaryLookupSuccess = signal(false);

  readonly RelationshipType = RelationshipType;

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  readonly isSelfRequest = computed(() => {
    return this.relationshipType === RelationshipType.Self;
  });

  /**
   * In self request, patient data is the current logged-in citizen.
   * In other request, patient data is loaded after beneficiary lookup.
   */
  readonly patientData = computed(() => {
    return this.isSelfRequest()
      ? this.store.currentCitizenData()
      : this.store.beneficiaryData();
  });

  readonly pageTitleKey = computed(() => {
    return this.isSelfRequest()
      ? 'Create-Blood-Request-Form-Keys.SELF_PAGE_TITLE'
      : 'Create-Blood-Request-Form-Keys.OTHER_PAGE_TITLE';
  });

  readonly pageDescriptionKey = computed(() => {
    return this.isSelfRequest()
      ? 'Create-Blood-Request-Form-Keys.SELF_PAGE_DESCRIPTION'
      : 'Create-Blood-Request-Form-Keys.OTHER_PAGE_DESCRIPTION';
  });

  /**
   * For other-person request only.
   * Self relationship is excluded because self page already fixes the relationship.
   */
  readonly relationshipOptions: DropdownOption<RelationshipType>[] =
    RELATIONSHIP_TYPE_OPTIONS
      .filter(option => option.value !== RelationshipType.Self)
      .map(option => ({
        value: option.value,
        label: option.label
      }));

  readonly hospitalOptions = computed<DropdownOption<number>[]>(() => {
    return this.store.activeHospitals().map(hospital => ({
      value: hospital.id,
      label: this.isArabic()
        ? hospital.hospitalNameAr
        : hospital.hospitalNameEn
    }));
  });

  /**
   * Doctors are loaded separately after hospital selection.
   * HospitalModel does not contain doctors.
   */
  readonly doctorOptions = computed<DropdownOption<number>[]>(() => {
    return this.store.doctors().map(doctor => ({
      value: doctor.userId,
      label: this.isArabic()
        ? doctor.fullNameAr
        : doctor.fullNameEn
    }));
  });

  readonly createBloodRequestForm = this.fb.group({
    relationshipType: this.fb.control<RelationshipType | null>(null),

    beneficiaryNationalId: this.fb.nonNullable.control(''),

    hospitalId: this.fb.control<number | null>(null, [
      Validators.required
    ]),

    doctorId: this.fb.control<number | null>(null, [
      Validators.required
    ])
  });

  ngOnInit(): void {
    this.createBloodRequestForm.controls.relationshipType.setValue(
      this.relationshipType
    );

    this.configureValidators();

    this.facade.loadCreateRequestInitialData(this.isSelfRequest());
  }

  onRelationshipChange(value: RelationshipType | null): void {
    this.createBloodRequestForm.controls.relationshipType.setValue(value);
    this.createBloodRequestForm.controls.relationshipType.markAsTouched();
  }

  onHospitalChange(value: number | null): void {
    this.createBloodRequestForm.controls.hospitalId.setValue(value);
    this.createBloodRequestForm.controls.hospitalId.markAsTouched();

    this.createBloodRequestForm.controls.doctorId.setValue(null);
    this.store.setDoctors([]);

    if (value) {
      this.facade.loadDoctorsByHospital(value);
    }
  }

  onDoctorChange(value: number | null): void {
    this.createBloodRequestForm.controls.doctorId.setValue(value);
    this.createBloodRequestForm.controls.doctorId.markAsTouched();
  }

  onLookupBeneficiary(): void {
    this.store.setErrorMessage(null);
    this.store.setBeneficiaryData(null);
    this.beneficiaryLookupSuccess.set(false);

    const nationalIdControl =
      this.createBloodRequestForm.controls.beneficiaryNationalId;

    nationalIdControl.markAsTouched();

    if (nationalIdControl.invalid) {
      return;
    }

    const nationalId = nationalIdControl.value.trim();

    this.facade.lookupBeneficiaryByNationalId(nationalId, () => {
      this.beneficiaryLookupSuccess.set(true);
    });
  }

  onSubmit(): void {
    this.store.setErrorMessage(null);
    this.store.setSuccessMessage(null);
    this.showSuccessMessage.set(false);

    if (this.createBloodRequestForm.invalid) {
      this.createBloodRequestForm.markAllAsTouched();
      return;
    }

    if (!this.patientData()) {
      this.store.setErrorMessage(
        'Create-Blood-Request-Form-Keys.BENEFICIARY_LOOKUP_REQUIRED'
      );
      return;
    }

    const formValue = this.createBloodRequestForm.getRawValue();

    const request: CreateBloodRequestModel = {
      relationshipType: this.isSelfRequest()
        ? RelationshipType.Self
        : formValue.relationshipType!,
      hospitalId: formValue.hospitalId!,
      doctorId: formValue.doctorId!,
      beneficiaryNationalId: this.isSelfRequest()
        ? null
        : formValue.beneficiaryNationalId.trim()
    };

    this.facade.createBloodRequest(request, () => {
      this.showSuccessMessage.set(true);

      setTimeout(() => {
        this.router.navigate(['/user/blood-request/create']);
      }, 900);
    });
  }

  private configureValidators(): void {
    const relationshipControl =
      this.createBloodRequestForm.controls.relationshipType;

    const beneficiaryNationalIdControl =
      this.createBloodRequestForm.controls.beneficiaryNationalId;

    if (this.isSelfRequest()) {
      relationshipControl.clearValidators();
      relationshipControl.setValue(RelationshipType.Self);

      beneficiaryNationalIdControl.clearValidators();
      beneficiaryNationalIdControl.setValue('');
    } else {
      relationshipControl.setValidators([Validators.required]);

      beneficiaryNationalIdControl.setValidators([
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]);
    }

    relationshipControl.updateValueAndValidity();
    beneficiaryNationalIdControl.updateValueAndValidity();
  }
}
