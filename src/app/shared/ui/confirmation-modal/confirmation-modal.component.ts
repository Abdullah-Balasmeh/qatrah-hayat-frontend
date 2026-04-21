import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
export type ConfirmationModalType = 'danger' | 'warning' | 'success' | 'info';
@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule, TranslateModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
 readonly isOpen = input<boolean>(false);

  readonly type = input<ConfirmationModalType>('danger');

  readonly title = input.required<string>();
  readonly message = input.required<string>();

  readonly confirmText = input<string>('COMMON.CONFIRM');
  readonly cancelText = input<string>('COMMON.CANCEL');

  readonly isLoading = input<boolean>(false);

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  readonly modalIcon = computed(() => {
    switch (this.type()) {
      case 'danger':
        return 'fa-solid fa-trash';
      case 'warning':
        return 'fa-solid fa-triangle-exclamation';
      case 'success':
        return 'fa-solid fa-user-check';
      case 'info':
        return 'fa-solid fa-circle-info';
      default:
        return 'fa-solid fa-circle-info';
    }
  });

  onConfirm(): void {
    if (this.isLoading()) {
      return;
    }

    this.confirmed.emit();
  }

  onCancel(): void {
    if (this.isLoading()) {
      return;
    }

    this.cancelled.emit();
  }
}
