import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { DropDownWithLabelComponent } from '../../../../../shared/ui/drop-down-with-label/drop-down-with-label.component';
import { DropdownOption } from '../../../../../shared/ui/app-filter-button/app-filter-button.component';

import { LanguageService } from '../../../../../core/services/language.service';

import { HospitalManagementFacade } from '../../facades/hospital-management.facade';
import { AddHospitalFormModel } from '../../view-models/add-hospital-form.model';
import { AddHospitalRequestModel } from '../../../domain/models/add-hospital-request.model';

@Component({
  selector: 'app-add-hospital-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextFieldComponent,
    DropDownWithLabelComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent
  ],
  templateUrl: './add-hospital-form.component.html',
  styleUrl: './add-hospital-form.component.css'
})
export class AddHospitalFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly facade = inject(HospitalManagementFacade);
  private readonly languageService = inject(LanguageService);

  readonly store = this.facade.store;

  readonly showSuccessMessage = signal(false);

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

  readonly addHospitalForm = this.fb.group<AddHospitalFormModel>({
    hospitalNameAr: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(256)
    ]),

    hospitalNameEn: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(256)
    ]),

    addressAR: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(500)
    ]),

    addressEn: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(500)
    ]),

    branchId: this.fb.control<number | null>(null, [
      Validators.required
    ])
  });

  ngOnInit(): void {
    this.facade.loadActiveBranches();
    this.facade.loadAvailableDoctors();
  }

  onBranchChange(value: number | null): void {
    this.addHospitalForm.controls.branchId.setValue(value);
    this.addHospitalForm.controls.branchId.markAsTouched();
  }

  onSubmit(): void {
    this.store.setErrorMessage(null);
    this.showSuccessMessage.set(false);

    if (this.addHospitalForm.invalid) {
      this.addHospitalForm.markAllAsTouched();
      return;
    }

    const formValue = this.addHospitalForm.getRawValue();

    const request: AddHospitalRequestModel = {
      hospitalNameAr: formValue.hospitalNameAr.trim(),
      hospitalNameEn: formValue.hospitalNameEn.trim(),

      addressAR: formValue.addressAR.trim(),
      addressEn: formValue.addressEn.trim(),

      branchId: formValue.branchId!
    };

    this.facade.addHospital(request, () => {
      this.showSuccessMessage.set(true);
      this.addHospitalForm.reset();

      setTimeout(() => {
        this.router.navigate(['/admin/hospitals']);
      }, 800);
    });
  }
}
