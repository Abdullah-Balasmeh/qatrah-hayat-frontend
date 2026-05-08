import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { DropDownWithLabelComponent } from '../../../../../shared/ui/drop-down-with-label/drop-down-with-label.component';

import { DropdownOption } from '../../../../../shared/ui/app-filter-button/app-filter-button.component';
import { LanguageService } from '../../../../../core/services/language.service';

import { HospitalManagementFacade } from '../../facades/hospital-management.facade';
import { EditHospitalFormModel } from '../../view-models/edit-hospital-form.model';
import { UpdateHospitalModel } from '../../../domain/models/update-hospital.model';

@Component({
  selector: 'app-edit-hospital-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextFieldComponent,
    DropDownWithLabelComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent
  ],
  templateUrl: './edit-hospital-form.component.html',
  styleUrl: './edit-hospital-form.component.css'
})
export class EditHospitalFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(HospitalManagementFacade);
  private readonly languageService = inject(LanguageService);

  readonly store = this.facade.store;

  readonly hospitalId = signal<number | null>(null);
  readonly showSuccessMessage = signal(false);
  private readonly isFormPatched = signal(false);

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  readonly branchOptions = computed<DropdownOption<number>[]>(() => {
    return this.store.activeBranches().map(branch => ({
      value: branch.id,
      label: this.isArabic()
        ? branch.branchNameAr
        : branch.branchNameEn
    }));
  });

  readonly editHospitalForm = this.fb.group<EditHospitalFormModel>({
    hospitalNameAr: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(256)
    ]),

    hospitalNameEn: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(256)
    ]),

    addressAr: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(500)
    ]),

    addressEn: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(500)
    ]),

    branchId: this.fb.control<number | null>(null, [
      Validators.required
    ]),

    isActive: this.fb.nonNullable.control(true)
  });

  constructor() {
    effect(() => {
      const hospital = this.store.selectedHospital();

      if (!hospital || this.isFormPatched()) {
        return;
      }

      this.editHospitalForm.patchValue({
        hospitalNameAr: hospital.hospitalNameAr,
        hospitalNameEn: hospital.hospitalNameEn,
        addressAr: hospital.addressAr,
        addressEn: hospital.addressEn,
        branchId: hospital.branchId,
        isActive: hospital.isActive
      });

      this.isFormPatched.set(true);
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/admin/hospitals']);
      return;
    }

    this.hospitalId.set(id);

    this.facade.loadActiveBranches();
    this.facade.loadHospitalById(id);
  }

  onBranchChange(value: number | null): void {
    this.editHospitalForm.controls.branchId.setValue(value);
    this.editHospitalForm.controls.branchId.markAsTouched();
  }

  onSubmit(): void {
    this.store.setErrorMessage(null);
    this.showSuccessMessage.set(false);

    if (this.editHospitalForm.invalid) {
      this.editHospitalForm.markAllAsTouched();
      return;
    }

    const id = this.hospitalId();

    if (!id) {
      return;
    }

    const formValue = this.editHospitalForm.getRawValue();

    const request: UpdateHospitalModel = {
      hospitalNameAr: formValue.hospitalNameAr.trim(),
      hospitalNameEn: formValue.hospitalNameEn.trim(),

      addressAr: formValue.addressAr.trim(),
      addressEn: formValue.addressEn.trim(),

      branchId: formValue.branchId!,

      isActive: formValue.isActive
    };

    this.facade.updateHospital(id, request, () => {
      this.showSuccessMessage.set(true);

      setTimeout(() => {
        this.router.navigate(['/admin/hospitals']);
      }, 800);
    });
  }
}
