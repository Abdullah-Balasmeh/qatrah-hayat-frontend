import { Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { BranchResponseModel } from '../models/branch-response.model';
import { BranchStatisticsResponseModel } from '../models/branch-statistics-response.model';
import { BranchQueryModel } from '../models/branch-query.model';
import { AddBranchRequestModel } from '../models/add-branch-request.model';
import { UpdateBranchRequestModel } from '../models/update-branch-request.model';
import { AvailableBranchManagerModel } from '../models/available-branch-manager.model';

export abstract class BranchManagementRepository {
  abstract getAllBranches(
    query: BranchQueryModel
  ): Observable<PagedResultModel<BranchResponseModel>>;

  abstract getBranchById(branchId: number): Observable<BranchResponseModel>;

  abstract getStatistics(): Observable<BranchStatisticsResponseModel>;
abstract getAvailableManagers(
  currentBranchId?: number | null
): Observable<AvailableBranchManagerModel[]>;
  abstract addBranch(
    request: AddBranchRequestModel
  ): Observable<BranchResponseModel>;

  abstract updateBranch(
    branchId: number,
    request: UpdateBranchRequestModel
  ): Observable<BranchResponseModel>;

  abstract softDeleteBranch(branchId: number): Observable<void>;

  abstract activateBranch(branchId: number): Observable<void>;

  abstract deactivateBranch(branchId: number): Observable<void>;
}
