import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-container-footer',
  imports: [RouterLink],
  templateUrl: './auth-container-footer.component.html',
  styleUrl: './auth-container-footer.component.css'
})
export class AuthContainerFooterComponent {
  @Input() text: string = '';
  @Input() linkText: string = '';
  @Input() linkUrl: string = '';
}
