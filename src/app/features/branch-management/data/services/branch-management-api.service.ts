import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';

import { PagedResultModel } from '../../../../core/models/paged-result.model';
import { BranchResponseModel } from '../../domain/models/branch-response.model';
import { BranchStatisticsResponseModel } from '../../domain/models/branch-statistics-response.model';
import { BranchQueryModel } from '../../domain/models/branch-query.model';
import { AddBranchRequestModel } from '../../domain/models/add-branch-request.model';
import { UpdateBranchRequestModel } from '../../domain/models/update-branch-request.model';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { AvailableBranchManagerModel } from '../../domain/models/available-branch-manager.model';

@Injectable({
  providedIn: 'root'
})
export class BranchManagementApiService {
  private readonly apiService = inject(ApiService);

  getAllBranches(query: BranchQueryModel): Observable<PagedResultModel<BranchResponseModel>> {
    return this.apiService.get<PagedResultModel<BranchResponseModel>>(
      API_ENDPOINTS.branchManagement.getAllBranchesEndpoint,
      {
        params: {
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
          ...(query.searchTerm ? { searchTerm: query.searchTerm } : {}),
          ...(query.isActive !== null && query.isActive !== undefined
            ? { isActive: query.isActive }
            : {})
        }
      }
    );
  }

  getBranchById(branchId: number): Observable<BranchResponseModel> {
    const url = API_ENDPOINTS.branchManagement.getBranchByIdEndpoint
      .replace('{branchId}', branchId.toString());

    return this.apiService.get<BranchResponseModel>(url);
  }

  getStatistics(): Observable<BranchStatisticsResponseModel> {
    return this.apiService.get<BranchStatisticsResponseModel>(
      API_ENDPOINTS.branchManagement.getBranchesStatisticsEndpoint
    );
  }
  getAvailableManagers(
  currentBranchId?: number | null
): Observable<AvailableBranchManagerModel[]> {
  return this.apiService.get<AvailableBranchManagerModel[]>(
    API_ENDPOINTS.branchManagement.getAvailableBranchManagersEndpoint,
    {
      params: currentBranchId
        ? { currentBranchId }
        : {}
    }
  );
}

  addBranch(request: AddBranchRequestModel): Observable<BranchResponseModel> {
    return this.apiService.post<AddBranchRequestModel, BranchResponseModel>(
      API_ENDPOINTS.branchManagement.addBranchEndpoint,
      request
    );
  }

  updateBranch(
    branchId: number,
    request: UpdateBranchRequestModel
  ): Observable<BranchResponseModel> {
    const url = API_ENDPOINTS.branchManagement.updateBranchEndpoint
      .replace('{branchId}', branchId.toString());

    return this.apiService.put<UpdateBranchRequestModel, BranchResponseModel>(
      url,
      request
    );
  }

  softDeleteBranch(branchId: number): Observable<void> {
    const url = API_ENDPOINTS.branchManagement.softDeleteBranchEndpoint
      .replace('{branchId}', branchId.toString());

    return this.apiService.delete<void>(url);
  }

  activateBranch(branchId: number): Observable<void> {
    const url = API_ENDPOINTS.branchManagement.activateBranchEndpoint
      .replace('{branchId}', branchId.toString());

    return this.apiService.patch<null, void>(url, null);
  }

  deactivateBranch(branchId: number): Observable<void> {
    const url = API_ENDPOINTS.branchManagement.deactivateBranchEndpoint
      .replace('{branchId}', branchId.toString());

    return this.apiService.patch<null, void>(url, null);
  }
}
