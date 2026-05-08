import { Component, computed, inject, input, output } from '@angular/core';
import { UserRole } from '../../../../../core/enums/user-role.enum';
import { LanguageService } from '../../../../../core/services/language.service';
import { StaffInfoModel } from '../../../../user-management/domain/models/staff-info.model';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RoleBadgeComponent } from '../../../../user-management/presentation/components/role-badge/role-badge.component';
import { UserStatusBadgeComponent } from '../../../../user-management/presentation/components/user-status-badge/user-status-badge.component';
import { BranchInfoModel } from '../../../domain/models/branch-info.model';
import { BranchStatusBadgeComponent } from "../branch-status-badge/branch-status-badge.component";

@Component({
  selector: 'app-branches-table',
  imports: [RouterLink, TranslateModule, BranchStatusBadgeComponent],
  templateUrl: './branches-table.component.html',
  styleUrl: './branches-table.component.css'
})
export class BranchesTableComponent {
  readonly branches = input.required<BranchInfoModel[]>();

  private readonly languageService = inject(LanguageService);

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  readonly activateClicked = output<number>();
  readonly deactivateClicked = output<number>();
  readonly deleteClicked = output<number>();
}
