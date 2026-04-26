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

import { BranchManagementFacade } from '../../facades/branch-management.facade';
import { AddBranchFormModel } from '../../view-models/add-branch-form.model';
import { AddBranchRequestModel } from '../../../domain/models/add-branch-request.model';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-add-branch-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextFieldComponent,
    DropDownWithLabelComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent
  ],
  templateUrl: './add-branch-form.component.html',
  styleUrl: './add-branch-form.component.css'
})
export class AddBranchFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly facade = inject(BranchManagementFacade);
  private readonly languageService = inject(LanguageService);

  readonly store = this.facade.store;

  readonly showSuccessMessage = signal(false);

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  readonly managerOptions = computed<DropdownOption<number>[]>(() => {
    return this.store.availableManagers().map(manager => ({
      value: manager.userId,
      label: this.isArabic()
        ? manager.fullNameAr
        : manager.fullNameEn
    }));
  });

  readonly addBranchForm = this.fb.group<AddBranchFormModel>({
    branchNameAr: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(256)
    ]),

    branchNameEn: this.fb.nonNullable.control('', [
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

    managerUserId: this.fb.control<number | null>(null, [
      Validators.required
    ]),

    gpsLat: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(-90),
      Validators.max(90)
    ]),

    gpsLng: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(-180),
      Validators.max(180)
    ]),

    email: this.fb.nonNullable.control('', [
      Validators.email,
      Validators.maxLength(256)
    ]),

    phone: this.fb.nonNullable.control('', [
      Validators.pattern(/^07\d{8}$/)
    ])
  });

  ngOnInit(): void {
    this.facade.loadAvailableManagers();
  }

  onManagerChange(value: number | null): void {
    this.addBranchForm.controls.managerUserId.setValue(value);
    this.addBranchForm.controls.managerUserId.markAsTouched();
  }

  onSubmit(): void {
    this.store.setErrorMessage(null);
    this.showSuccessMessage.set(false);

    if (this.addBranchForm.invalid) {
      this.addBranchForm.markAllAsTouched();
      return;
    }

    const formValue = this.addBranchForm.getRawValue();

    const request: AddBranchRequestModel = {
      branchNameAr: formValue.branchNameAr.trim(),
      branchNameEn: formValue.branchNameEn.trim(),

      addressAr: formValue.addressAr.trim(),
      addressEn: formValue.addressEn.trim(),

      managerUserId: formValue.managerUserId!,

      gpsLat: Number(formValue.gpsLat),
      gpsLng: Number(formValue.gpsLng),

      email: formValue.email.trim() || null,
      phone: formValue.phone.trim() || null
    };

    this.facade.addBranch(request, () => {
      this.showSuccessMessage.set(true);
      this.addBranchForm.reset();

      setTimeout(() => {
        this.router.navigate(['/admin/branches']);
      }, 800);
    });
  }
}
