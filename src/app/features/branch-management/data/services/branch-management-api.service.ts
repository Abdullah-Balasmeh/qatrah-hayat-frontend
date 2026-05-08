import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { BranchQueryModel } from '../../domain/models/branch-query.model';

import { BranchResponseDto } from '../dtos/branch-response.dto';
import { BranchStatisticsResponseDto } from '../dtos/branch-statistics-response.dto';
import { AddBranchRequestDto } from '../dtos/add-branch-request.dto';
import { UpdateBranchRequestDto } from '../dtos/update-branch-request.dto';
import { AvailableBranchManagerDto } from '../dtos/available-branch-manager.dto';

@Injectable({
  providedIn: 'root'
})
export class BranchManagementApiService {
  private readonly apiService = inject(ApiService);

  getAllBranches(
    query: BranchQueryModel
  ): Observable<PagedResultModel<BranchResponseDto>> {
    return this.apiService.get<PagedResultModel<BranchResponseDto>>(
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

  getBranchById(branchId: number): Observable<BranchResponseDto> {
    const url = API_ENDPOINTS.branchManagement.getBranchByIdEndpoint
      .replace('{branchId}', branchId.toString());

    return this.apiService.get<BranchResponseDto>(url);
  }

  getStatistics(): Observable<BranchStatisticsResponseDto> {
    return this.apiService.get<BranchStatisticsResponseDto>(
      API_ENDPOINTS.branchManagement.getBranchesStatisticsEndpoint
    );
  }

  getAvailableManagers(
    currentBranchId?: number | null
  ): Observable<AvailableBranchManagerDto[]> {
    return this.apiService.get<AvailableBranchManagerDto[]>(
      API_ENDPOINTS.branchManagement.getAvailableBranchManagersEndpoint,
      {
        params:
          currentBranchId !== null && currentBranchId !== undefined
            ? { currentBranchId }
            : {}
      }
    );
  }

  addBranch(request: AddBranchRequestDto): Observable<BranchResponseDto> {
    return this.apiService.post<AddBranchRequestDto, BranchResponseDto>(
      API_ENDPOINTS.branchManagement.addBranchEndpoint,
      request
    );
  }

  updateBranch(
    branchId: number,
    request: UpdateBranchRequestDto
  ): Observable<BranchResponseDto> {
    const url = API_ENDPOINTS.branchManagement.updateBranchEndpoint
      .replace('{branchId}', branchId.toString());

    return this.apiService.put<UpdateBranchRequestDto, BranchResponseDto>(
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
