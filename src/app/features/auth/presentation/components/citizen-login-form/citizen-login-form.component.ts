import { Component, DestroyRef, inject } from '@angular/core';
import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { PasswordTextFieldComponent } from '../../../../../shared/ui/password-text-field/password-text-field.component';
import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginRequestModel } from '../../../domain/models/login-request.model';
import { LoginFormModel } from '../../view-models/login-form.model';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordAndRememberMeComponent } from '../forget-password-and-remember-me/forget-password-and-remember-me.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthFacade } from '../../facades/auth.facade';


@Component({
  selector: 'app-citizen-login-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    AppPrimaryButtonComponent,
    FormErrorMessageComponent,
    PasswordTextFieldComponent,
    TextFieldComponent,
    ForgetPasswordAndRememberMeComponent,
  ],
  templateUrl: './citizen-login-form.component.html',
  styleUrl: './citizen-login-form.component.css',
})
export class CitizenLoginFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);
  private readonly activatedRoute = inject(ActivatedRoute);
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
    rememberMe: this.fb.nonNullable.control(false),
  });

  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    const request: LoginRequestModel = this.loginForm.getRawValue();
    const returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl');

    this.authFacade
      .loginCitizen(request, returnUrl)
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
      rememberMe: false,
    });
  }
}
