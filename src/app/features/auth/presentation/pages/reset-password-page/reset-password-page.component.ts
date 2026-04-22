import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { PasswordTextFieldComponent } from '../../../../../shared/ui/password-text-field/password-text-field.component';
import { AuthFacade } from '../../facades/auth.facade';
import { matchFieldsValidator } from '../../../../../shared/validators/password-match.validator';
import { AuthContainerHeadingComponent } from "../../components/auth-container-heading/auth-container-heading.component";

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    PasswordTextFieldComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent,
    AuthContainerHeadingComponent
],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css'
})
export class ResetPasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = this.authFacade.loading;
  readonly serverErrorMessage = this.authFacade.error;

  readonly email = this.route.snapshot.queryParamMap.get('email') ?? '';
  readonly resetSessionToken = this.route.snapshot.queryParamMap.get('token') ?? '';

  readonly form = this.fb.group(
    {
      newPassword: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      confirmNewPassword: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(64),
      ]),
    },
    {
      validators: matchFieldsValidator('newPassword', 'confirmNewPassword'),
    }
  );

  constructor() {
    if (!this.email || !this.resetSessionToken) {
      this.router.navigate(['/auth/forgot-password'], {
        replaceUrl: true,
      });
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || !this.email || !this.resetSessionToken) {
      return;
    }

    this.authFacade
      .resetPassword({
        email: this.email,
        resetSessionToken: this.resetSessionToken,
        newPassword: this.form.controls.newPassword.value,
        confirmNewPassword: this.form.controls.confirmNewPassword.value,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login'], {
            queryParams: {
              passwordReset: 'success',
            },
            replaceUrl: true,
          });
        },
        error: () => {}
      });
  }
}
