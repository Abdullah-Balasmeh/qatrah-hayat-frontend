import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-users-page-header',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './users-page-header.component.html',
  styleUrl: './users-page-header.component.css'
})
export class UsersPageHeaderComponent {

}
