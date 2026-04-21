import { Component, input, output } from '@angular/core';
import { UsersTabType } from '../../store/users-management.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-users-tabs',
  imports: [TranslateModule],
  templateUrl: './users-tabs.component.html',
  styleUrl: './users-tabs.component.css'
})
export class UsersTabsComponent {
  readonly selectedTab = input.required<UsersTabType>();
  readonly tabChanged = output<UsersTabType>();

  selectTab(tab: UsersTabType): void {
    this.tabChanged.emit(tab);
  }
}
