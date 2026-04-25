import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-branches-page-header',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './branches-page-header.component.html',
  styleUrl: './branches-page-header.component.css'
})
export class BranchesPageHeaderComponent {

}
