import { Component, inject } from '@angular/core';
import { AppPrimaryButtonComponent } from "../../../../../shared/ui/app-primary-button/app-primary-button.component";
import { FormErrorMessageComponent } from "../../../../../shared/ui/form-error-message/form-error-message.component";
import { PasswordTextFieldComponent } from "../../../../../shared/ui/password-text-field/password-text-field.component";
import { TextFieldComponent } from "../../../../../shared/ui/text-field/text-field.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil, finalize } from 'rxjs';
import { Failure } from '../../../../../core/errors/failure';
import { LoginRequestModel } from '../../../domain/models/login-request.model';
import { LoginFormModel } from '../../view-models/login-form.model';
import { mapLoginFormToLoginRequest } from '../../../data/mappers/login.mapper';
import { AuthService } from '../../../data/services/auth.service';
import { ScreeningSessionType } from '../../../../screening/domain/enums/screening-session-type.enum';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordAndRememberMeComponent } from "../forget-password-and-remember-me/forget-password-and-remember-me.component";

@Component({
  selector: 'app-citizen-login-form',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, AppPrimaryButtonComponent, FormErrorMessageComponent, PasswordTextFieldComponent, TextFieldComponent, ForgetPasswordAndRememberMeComponent],
  templateUrl: './citizen-login-form.component.html',
  styleUrl: './citizen-login-form.component.css'
})
export class CitizenLoginFormComponent {
 private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();


  serverErrorMessage = '';
  isLoading = false;


  loginForm: FormGroup<LoginFormModel>;

  constructor() {
    this.loginForm = this.fb.group({
      nationalId: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d{10}$/)
      ]),

      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(64),
      ]),

    }
    );
  }



  onSubmit(): void {
    this.serverErrorMessage = '';

    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.getRawValue() as LoginRequestModel;
    const request = mapLoginFormToLoginRequest(formValue);
    this.isLoading = true;
    this.authService.login(request).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.clearData();

        if (!response.isProfileCompleted) {
          this.router.navigate(['/user/screening'], {
            queryParams: {
              sessionType: ScreeningSessionType.Registration,
              isForFemaleOnly: response.gender === 2
            }
          });
          return;
        }

        const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(returnUrl || '/user/dashboard');
      },
      error: (error: Failure) => {
        this.isLoading = false;
        if (error.message === "Invalid email/National ID or password.") {
          this.serverErrorMessage = this.translate.instant('invalidCredentials');
        } else if (error.message === "This account is inactive.") {
          this.serverErrorMessage = this.translate.instant('InactiveAccount');
        } else {
          this.serverErrorMessage = this.translate.instant('Generic_Error_Login');
        }
        console.error('Login error:', error);
      }
    });

    }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  clearData(): void {
    this.loginForm.reset();
    this.serverErrorMessage = '';
  }
}


