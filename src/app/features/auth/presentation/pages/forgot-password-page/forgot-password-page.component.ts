import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { AuthFacade } from '../../facades/auth.facade';
import { AuthContainerHeadingComponent } from "../../components/auth-container-heading/auth-container-heading.component";
import { AlertErrorComponent } from "../../../../../shared/ui/alert-error/alert-error.component";

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    TextFieldComponent,
    FormErrorMessageComponent,
    AppPrimaryButtonComponent,
    AuthContainerHeadingComponent,
    AlertErrorComponent
],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})
export class ForgotPasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = this.authFacade.loading;
  readonly serverErrorMessage = this.authFacade.error;

  readonly form = this.fb.group({
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(256),
    ]),
  });

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const email = this.form.controls.email.value.trim();

    this.authFacade
      .forgotPassword({ email })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/verify-reset-otp'], {
            queryParams: { email },
            replaceUrl: true,
          });
        },
        error: () => {}
      });
  }
}
