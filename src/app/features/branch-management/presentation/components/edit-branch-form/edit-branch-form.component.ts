import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
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

import { BranchManagementFacade } from '../../facades/branch-management.facade';
import {
  EditBranchFormModel,
  EditBranchWorkingHourFormGroup
} from '../../view-models/edit-branch-form.model';

import { UpdateBranchModel } from '../../../domain/models/update-branch.model';
import { LanguageService } from '../../../../../core/services/language.service';
import {
  BranchDayOfWeek,
  BranchWorkingHourModel
} from '../../../domain/models/branch-working-hour.model';

@Component({
  selector: 'app-edit-branch-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextFieldComponent,
    DropDownWithLabelComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent
  ],
  templateUrl: './edit-branch-form.component.html',
  styleUrl: './edit-branch-form.component.css'
})
export class EditBranchFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(BranchManagementFacade);
  private readonly languageService = inject(LanguageService);

  readonly store = this.facade.store;

  readonly showSuccessMessage = signal(false);
  readonly branchId = signal<number | null>(null);

  readonly daysOfWeek: BranchDayOfWeek[] = [0, 1, 2, 3, 4, 5, 6];

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  readonly managerOptions = computed<DropdownOption<number>[]>((() => {
    return this.store.availableManagers().map(manager => ({
      value: manager.userId,
      label: this.isArabic() ? manager.fullNameAr : manager.fullNameEn
    }));
  }));

  readonly editBranchForm = this.fb.group<EditBranchFormModel>({
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

    isActive: this.fb.nonNullable.control(true),

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
      Validators.pattern(/^0\d{1,9}$/)
    ]),

    workingHours: this.fb.array(
      this.daysOfWeek.map(day => this.createWorkingHourGroup(day))
    )
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/admin/branches']);
      return;
    }

    this.branchId.set(id);

    this.facade.loadAvailableManagers(id);
    this.facade.loadBranchById(id);

    /**
     * بما أن store signal، نستخدم effect لو بدك الأفضل.
     * لكن لتجنب تعقيد، سنستخدم polling بسيط مرة بعد التحميل.
     * الأفضل العملي: اعمل method في facade ترجع Observable، لكن حسب كودك الحالي هذا أسهل.
     */
    queueMicrotask(() => {
      const branch = this.store.selectedBranch();

      if (branch) {
        this.patchForm(branch);
      }
    });

    setTimeout(() => {
      const branch = this.store.selectedBranch();

      if (branch) {
        this.patchForm(branch);
      }
    }, 500);
  }

  onManagerChange(value: number | null): void {
    this.editBranchForm.controls.managerUserId.setValue(value);
    this.editBranchForm.controls.managerUserId.markAsTouched();
  }

  onSubmit(): void {
    this.store.setErrorMessage(null);
    this.showSuccessMessage.set(false);

    if (this.editBranchForm.invalid) {
      this.editBranchForm.markAllAsTouched();
      return;
    }

    const id = this.branchId();

    if (!id) {
      return;
    }

    const formValue = this.editBranchForm.getRawValue();

    const request: UpdateBranchModel = {
      branchNameAr: formValue.branchNameAr.trim(),
      branchNameEn: formValue.branchNameEn.trim(),

      addressAr: formValue.addressAr.trim(),
      addressEn: formValue.addressEn.trim(),

      managerUserId: formValue.managerUserId!,

      isActive: formValue.isActive,

      gpsLat: Number(formValue.gpsLat),
      gpsLng: Number(formValue.gpsLng),

      email: formValue.email.trim() || null,
      phone: formValue.phone.trim() || null,

      workingHours: formValue.workingHours.map(wh => ({
        dayOfWeek: wh.dayOfWeek!,
        openTime: this.normalizeTimeForApi(wh.openTime!),
        closeTime: this.normalizeTimeForApi(wh.closeTime!),
        isClosed: wh.isClosed!
      }))
    };

    this.facade.updateBranch(id, request, () => {
      this.showSuccessMessage.set(true);

      setTimeout(() => {
        this.router.navigate(['/admin/branches']);
      }, 800);
    });
  }

  private patchForm(branch: any): void {
    this.editBranchForm.patchValue({
      branchNameAr: branch.branchNameAr,
      branchNameEn: branch.branchNameEn,
      addressAr: branch.addressAr,
      addressEn: branch.addressEn,
      managerUserId: branch.managerUserId,
      isActive: branch.isActive,
      gpsLat: branch.gpsLat,
      gpsLng: branch.gpsLng,
      email: branch.email ?? '',
      phone: branch.phone ?? ''
    });

    this.patchWorkingHours(branch.workingHours ?? []);
  }

  private patchWorkingHours(workingHours: BranchWorkingHourModel[]): void {
    const workingHoursArray = this.editBranchForm.controls.workingHours;

    workingHoursArray.clear();

    const sortedHours = this.daysOfWeek.map(day => {
      const existing = workingHours.find(wh => wh.dayOfWeek === day);

      return existing ?? {
        dayOfWeek: day,
        openTime: '08:00',
        closeTime: '20:00',
        isClosed: false
      };
    });

    sortedHours.forEach(workingHour => {
      workingHoursArray.push(
        this.createWorkingHourGroup(
          workingHour.dayOfWeek,
          this.normalizeTimeForInput(workingHour.openTime),
          this.normalizeTimeForInput(workingHour.closeTime),
          workingHour.isClosed
        )
      );
    });
  }

  private createWorkingHourGroup(
    day: BranchDayOfWeek,
    openTime = '08:00',
    closeTime = '20:00',
    isClosed = false
  ): FormGroup<EditBranchWorkingHourFormGroup> {
    return this.fb.group<EditBranchWorkingHourFormGroup>({
      dayOfWeek: this.fb.nonNullable.control(day),
      openTime: this.fb.nonNullable.control(openTime, [Validators.required]),
      closeTime: this.fb.nonNullable.control(closeTime, [Validators.required]),
      isClosed: this.fb.nonNullable.control(isClosed)
    });
  }

  private normalizeTimeForApi(time: string): string {
    if (!time) {
      return time;
    }

    return time.length === 5 ? `${time}:00` : time;
  }

  private normalizeTimeForInput(time: string): string {
    if (!time) {
      return '';
    }

    return time.length >= 5 ? time.substring(0, 5) : time;
  }
}
