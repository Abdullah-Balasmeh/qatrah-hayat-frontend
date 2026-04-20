import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SearchBarComponent } from "../../../../../shared/ui/search-bar/search-bar.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  imports: [TranslateModule, SearchBarComponent, ReactiveFormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {
searchControl = new FormControl<string>('', { nonNullable: true });
}
