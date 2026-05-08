import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-branch-page-header',
  imports: [RouterLink, TranslateModule],
  templateUrl: './edit-branch-page-header.component.html',
  styleUrl: './edit-branch-page-header.component.css'
})
export class EditBranchPageHeaderComponent {

}
