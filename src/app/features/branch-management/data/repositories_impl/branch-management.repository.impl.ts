import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { BranchManagementRepository } from '../../domain/repositories/branch-management.repository';
import { BranchManagementApiService } from '../services/branch-management-api.service';

import { BranchResponseModel } from '../../domain/models/branch-response.model';
import { BranchStatisticsResponseModel } from '../../domain/models/branch-statistics-response.model';
import { BranchQueryModel } from '../../domain/models/branch-query.model';
import { AddBranchRequestModel } from '../../domain/models/add-branch-request.model';
import { UpdateBranchRequestModel } from '../../domain/models/update-branch-request.model';
import { AvailableBranchManagerModel } from '../../domain/models/available-branch-manager.model';

@Injectable()
export class BranchManagementRepositoryImpl extends BranchManagementRepository {
  private readonly branchManagementApiService = inject(BranchManagementApiService);

  override getAllBranches(
    query: BranchQueryModel
  ): Observable<PagedResultModel<BranchResponseModel>> {
    return this.branchManagementApiService.getAllBranches(query);
  }

  override getBranchById(branchId: number): Observable<BranchResponseModel> {
    return this.branchManagementApiService.getBranchById(branchId);
  }

  override getStatistics(): Observable<BranchStatisticsResponseModel> {
    return this.branchManagementApiService.getStatistics();
  }

  override getAvailableManagers(
  currentBranchId?: number | null
): Observable<AvailableBranchManagerModel[]> {
  return this.branchManagementApiService.getAvailableManagers(currentBranchId);
}

  override addBranch(
    request: AddBranchRequestModel
  ): Observable<BranchResponseModel> {
    return this.branchManagementApiService.addBranch(request);
  }

  override updateBranch(
    branchId: number,
    request: UpdateBranchRequestModel
  ): Observable<BranchResponseModel> {
    return this.branchManagementApiService.updateBranch(branchId, request);
  }

  override softDeleteBranch(branchId: number): Observable<void> {
    return this.branchManagementApiService.softDeleteBranch(branchId);
  }

  override activateBranch(branchId: number): Observable<void> {
    return this.branchManagementApiService.activateBranch(branchId);
  }

  override deactivateBranch(branchId: number): Observable<void> {
    return this.branchManagementApiService.deactivateBranch(branchId);
  }
}
