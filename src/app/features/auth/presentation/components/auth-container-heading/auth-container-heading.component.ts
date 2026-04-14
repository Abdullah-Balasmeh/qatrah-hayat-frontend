import { Component, inject, Input } from '@angular/core';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-auth-container-heading',
  imports: [],
  templateUrl: './auth-container-heading.component.html',
  styleUrl: './auth-container-heading.component.css'
})
export class AuthContainerHeadingComponent {
  langService = inject(LanguageService);
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
