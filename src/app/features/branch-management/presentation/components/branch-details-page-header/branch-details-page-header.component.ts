import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-branch-details-page-header',
  imports: [TranslateModule, RouterLink],
  templateUrl: './branch-details-page-header.component.html',
  styleUrl: './branch-details-page-header.component.css'
})
export class BranchDetailsPageHeaderComponent {

}
