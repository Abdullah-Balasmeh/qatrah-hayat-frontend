import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import {
  USER_ROLE_OPTIONS,
  UserRole
} from '../../../../../core/enums/user-role.enum';

import { LanguageService } from '../../../../../core/services/language.service';
import { DropdownOption } from '../../../../../shared/ui/app-filter-button/app-filter-button.component';

import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { DropDownWithLabelComponent } from '../../../../../shared/ui/drop-down-with-label/drop-down-with-label.component';

import { UsersManagementFacade } from '../../facades/users-management.facade';
import { EditStaffFormModel } from '../../view-models/edit-staff-form.model';
import { UpdateStaffModel } from '../../../domain/models/update-staff.model';

@Component({
  selector: 'app-edit-staff-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextFieldComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent,
    DropDownWithLabelComponent
  ],
  templateUrl: './edit-staff-form.component.html',
  styleUrl: './edit-staff-form.component.css'
})
export class EditStaffFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly facade = inject(UsersManagementFacade);
  private readonly languageService = inject(LanguageService);

  readonly store = this.facade.store;
  readonly UserRole = UserRole;

  readonly staffId = signal<number | null>(null);
  readonly showSuccessMessage = signal(false);
  private readonly isFormPatched = signal(false);

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

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

  readonly editStaffForm = this.fb.group<EditStaffFormModel>({
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email
    ]),

    phoneNumber: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^07\d{8}$/)
    ]),

    staffRole: this.fb.control<UserRole | null>(null, [
      Validators.required
    ]),

    branchId: this.fb.control<number | null>(null),
    hospitalId: this.fb.control<number | null>(null),

    isActive: this.fb.nonNullable.control(true)
  });

  constructor() {
    effect(() => {
      const staff = this.store.selectedStaff();

      if (!staff || this.isFormPatched()) {
        return;
      }

      const staffRole = staff.roles.find(role =>
        role === UserRole.Doctor ||
        role === UserRole.Employee ||
        role === UserRole.BranchManager ||
        role === UserRole.Admin
      ) ?? null;

      this.editStaffForm.patchValue({
        email: staff.email,
        phoneNumber: staff.phoneNumber,
        staffRole,
        branchId: staff.branchId,
        hospitalId: staff.hospitalId,
        isActive: staff.isActive
      });

      this.applyLocationValidators();
      this.isFormPatched.set(true);
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/admin/users']);
      return;
    }

    this.staffId.set(id);
    this.facade.loadActiveBranches();
    this.facade.loadActiveHospitals();
    this.facade.loadStaffById(id);
  }

  onStaffRoleChange(role: UserRole | null): void {
    this.editStaffForm.controls.staffRole.setValue(role);
    this.editStaffForm.controls.staffRole.markAsTouched();

    this.editStaffForm.patchValue({
      branchId: null,
      hospitalId: null
    });

    this.applyLocationValidators();
  }

  onBranchChange(branchId: number | null): void {
    this.editStaffForm.controls.branchId.setValue(branchId);
    this.editStaffForm.controls.branchId.markAsTouched();
  }

  onHospitalChange(hospitalId: number | null): void {
    this.editStaffForm.controls.hospitalId.setValue(hospitalId);
    this.editStaffForm.controls.hospitalId.markAsTouched();
  }

  onSubmit(): void {
    this.store.errorMessage.set(null);
    this.showSuccessMessage.set(false);

    this.applyLocationValidators();
    this.editStaffForm.markAllAsTouched();

    if (this.editStaffForm.invalid) {
      return;
    }

    const id = this.staffId();

    if (!id) {
      return;
    }

    const value = this.editStaffForm.getRawValue();

    if (!value.staffRole) {
      return;
    }

    const request: UpdateStaffModel = {
      email: value.email.trim(),
      phoneNumber: value.phoneNumber.trim(),
      staffRole: value.staffRole,
      branchId: this.getBranchIdForRole(value.staffRole, value.branchId),
      hospitalId: this.getHospitalIdForRole(value.staffRole, value.hospitalId),
      isActive: value.isActive
    };

    this.facade.updateStaff(id, request, () => {
      this.showSuccessMessage.set(true);

      setTimeout(() => {
        this.router.navigate(['/admin/users']);
      }, 800);
    });
  }

  private applyLocationValidators(): void {
    const staffRole = this.editStaffForm.controls.staffRole.value;

    const branchControl = this.editStaffForm.controls.branchId;
    const hospitalControl = this.editStaffForm.controls.hospitalId;

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
}
