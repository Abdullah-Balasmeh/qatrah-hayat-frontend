import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';

import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { AuthFacade } from '../../facades/auth.facade';
import { AuthContainerHeadingComponent } from '../../components/auth-container-heading/auth-container-heading.component';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-verify-reset-otp-page',
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
  ],
  templateUrl: './verify-otp-page.component.html',
  styleUrl: './verify-otp-page.component.css',
})
export class VerifyOTPPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly langService = inject(LanguageService);

  private readonly resendCooldownSeconds = 59;
  private countdownSubscription?: Subscription;

  readonly isLoading = this.authFacade.loading;
  readonly serverErrorMessage = this.authFacade.error;

  readonly email = this.route.snapshot.queryParamMap.get('email') ?? '';

  readonly resendSeconds = signal(this.resendCooldownSeconds);

  readonly canResendOtp = computed(() => {
    return this.resendSeconds() === 60 && !this.isLoading();
  });
  readonly isArabic = computed(() => this.langService.currentLang === 'ar');

  readonly form = this.fb.group({
    otp: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern(/^\d{6}$/),
    ]),
  });

  constructor() {
    if (!this.email) {
      this.router.navigate(['/auth/forgot-password'], {
        replaceUrl: true,
      });
      return;
    }

    this.startResendTimer();

    this.destroyRef.onDestroy(() => {
      this.countdownSubscription?.unsubscribe();
    });
  }

  resendOtp(): void {
    if (!this.email || !this.canResendOtp()) {
      return;
    }

    this.authFacade
      .forgotPassword({ email: this.email , isArabic: this.isArabic()})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.form.reset({ otp: '' });
          this.startResendTimer();
        },
        error: () => {},
      });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || !this.email) {
      return;
    }

    const otp = this.form.controls.otp.value.trim();

    this.authFacade
      .verifyResetOtp({
        email: this.email,
        otp,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.router.navigate(['/auth/reset-password'], {
            queryParams: {
              email: this.email,
              token: response.resetSessionToken,
            },
            replaceUrl: true,
          });
        },
        error: () => {},
      });
  }

  private startResendTimer(): void {
    this.countdownSubscription?.unsubscribe();
    this.resendSeconds.set(this.resendCooldownSeconds);

    this.countdownSubscription = interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const currentSeconds = this.resendSeconds();

        if (currentSeconds <= 1) {
          this.resendSeconds.set(60);
          this.countdownSubscription?.unsubscribe();
          return;
        }

        this.resendSeconds.set(currentSeconds - 1);
      });
  }
}
