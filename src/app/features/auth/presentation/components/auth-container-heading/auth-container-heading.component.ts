import { Component, inject, Input } from '@angular/core';
import { LanguageService } from '../../../../../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-container-heading',
  imports: [TranslateModule],
  templateUrl: './auth-container-heading.component.html',
  styleUrl: './auth-container-heading.component.css'
})
export class AuthContainerHeadingComponent {
  langService = inject(LanguageService);
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
