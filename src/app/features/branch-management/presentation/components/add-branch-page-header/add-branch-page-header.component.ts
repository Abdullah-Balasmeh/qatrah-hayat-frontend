import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-branch-page-header',
  imports: [RouterLink, TranslateModule],
  templateUrl: './add-branch-page-header.component.html',
  styleUrl: './add-branch-page-header.component.css'
})
export class AddBranchPageHeaderComponent {

}
