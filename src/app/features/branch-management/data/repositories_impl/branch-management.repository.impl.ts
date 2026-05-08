import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { BranchManagementRepository } from '../../domain/repositories/branch-management.repository';
import { BranchManagementApiService } from '../services/branch-management-api.service';
import { BranchManagementMapper } from '../mappers/branch-management.mapper';

import { AvailableBranchManagerModel } from '../../domain/models/available-branch-manager.model';
import { BranchQueryModel } from '../../domain/models/branch-query.model';
import { BranchInfoModel } from '../../domain/models/branch-info.model';
import { BranchStatisticsModel } from '../../domain/models/branch-statistics.model';
import { AddBranchModel } from '../../domain/models/add-branch.model';
import { UpdateBranchModel } from '../../domain/models/update-branch.model';

@Injectable()
export class BranchManagementRepositoryImpl extends BranchManagementRepository {
  private readonly branchManagementApiService = inject(BranchManagementApiService);

  override getAllBranches(
    query: BranchQueryModel
  ): Observable<PagedResultModel<BranchInfoModel>> {
    return this.branchManagementApiService.getAllBranches(query).pipe(
      map(result => ({
        ...result,
        items: result.items.map(BranchManagementMapper.branchToModel)
      }))
    );
  }

  override getBranchById(branchId: number): Observable<BranchInfoModel> {
    return this.branchManagementApiService.getBranchById(branchId).pipe(
      map(BranchManagementMapper.branchToModel)
    );
  }

  override getStatistics(): Observable<BranchStatisticsModel> {
    return this.branchManagementApiService.getStatistics().pipe(
      map(BranchManagementMapper.statisticsToModel)
    );
  }

  override getAvailableManagers(
    currentBranchId?: number | null
  ): Observable<AvailableBranchManagerModel[]> {
    return this.branchManagementApiService.getAvailableManagers(currentBranchId).pipe(
      map(managers => managers.map(BranchManagementMapper.availableManagerToModel))
    );
  }

  override addBranch(
    request: AddBranchModel
  ): Observable<BranchInfoModel> {
    return this.branchManagementApiService
      .addBranch(BranchManagementMapper.addRequestToDto(request))
      .pipe(map(BranchManagementMapper.branchToModel));
  }

  override updateBranch(
    branchId: number,
    request: UpdateBranchModel
  ): Observable<BranchInfoModel> {
    return this.branchManagementApiService
      .updateBranch(branchId, BranchManagementMapper.updateRequestToDto(request))
      .pipe(map(BranchManagementMapper.branchToModel));
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
