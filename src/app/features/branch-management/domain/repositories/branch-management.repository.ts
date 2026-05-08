import { Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { BranchInfoModel } from '../models/branch-info.model';
import { BranchStatisticsModel } from '../models/branch-statistics.model';
import { BranchQueryModel } from '../models/branch-query.model';
import { AddBranchModel } from '../models/add-branch.model';
import { UpdateBranchModel } from '../models/update-branch.model';
import { AvailableBranchManagerModel } from '../models/available-branch-manager.model';

export abstract class BranchManagementRepository {
  abstract getAllBranches(
    query: BranchQueryModel
  ): Observable<PagedResultModel<BranchInfoModel>>;

  abstract getBranchById(branchId: number): Observable<BranchInfoModel>;

  abstract getStatistics(): Observable<BranchStatisticsModel>;
abstract getAvailableManagers(
  currentBranchId?: number | null
): Observable<AvailableBranchManagerModel[]>;
  abstract addBranch(
    request: AddBranchModel
  ): Observable<BranchInfoModel>;

  abstract updateBranch(
    branchId: number,
    request: UpdateBranchModel
  ): Observable<BranchInfoModel>;

  abstract softDeleteBranch(branchId: number): Observable<void>;

  abstract activateBranch(branchId: number): Observable<void>;

  abstract deactivateBranch(branchId: number): Observable<void>;
}
