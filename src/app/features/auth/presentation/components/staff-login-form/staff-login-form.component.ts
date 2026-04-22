import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestModel } from '../../../domain/models/login-request.model';
import { AuthFacade } from '../../facades/auth.facade';
import { LoginFormModel } from '../../view-models/login-form.model';
import { AppPrimaryButtonComponent } from "../../../../../shared/ui/app-primary-button/app-primary-button.component";
import { FormErrorMessageComponent } from "../../../../../shared/ui/form-error-message/form-error-message.component";
import { ForgetPasswordAndRememberMeComponent } from "../forget-password-and-remember-me/forget-password-and-remember-me.component";
import { PasswordTextFieldComponent } from "../../../../../shared/ui/password-text-field/password-text-field.component";
import { TextFieldComponent } from "../../../../../shared/ui/text-field/text-field.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-staff-login-form',
  imports: [CommonModule,ReactiveFormsModule,TranslateModule,AppPrimaryButtonComponent, FormErrorMessageComponent, ForgetPasswordAndRememberMeComponent, PasswordTextFieldComponent, TextFieldComponent],
  templateUrl: './staff-login-form.component.html',
  styleUrl: './staff-login-form.component.css'
})
export class StaffLoginFormComponent {
 private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);
  readonly isLoading = this.authFacade.loading;
  readonly serverErrorMessage = this.authFacade.error;
private readonly destroyRef = inject(DestroyRef);
  readonly loginForm: FormGroup<LoginFormModel> = this.fb.group({
    nationalId: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^\d{10}$/),
    ]),
    password: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(64),
    ]),
    rememberMe:this.fb.nonNullable.control(false)
  });

  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    const request: LoginRequestModel = this.loginForm.getRawValue();

    this.authFacade
      .loginStaff(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.clearData();
        },
        error: (message: string) => {
          console.error(message);
        },
      });
  }

  clearData(): void {
    this.loginForm.reset({
      nationalId: '',
      password: '',
    });
  }
}

