import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StaffInfoResponseModel } from '../../domain/models/staff-info-response.model';
import { CitizenInfoResponseModel } from '../../domain/models/citizen-info-response.model';
import { UserManagementQueryModel } from '../../domain/models/user-management-query.model';
import { AddStaffRequestModel } from '../../domain/models/add-staff-request.model';
import { UpdateStaffRequestModel } from '../../domain/models/update-staff-request.model';
import { UpdateCitizenRequestModel } from '../../domain/models/update-citizen-request.model';

import { PagedResultModel } from '../../../../core/models/paged-result.model';
import { ApiService } from '../../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { UsersStatisticsResponseModel } from '../../domain/models/users-statistics-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementApiService {
  private readonly api = inject(ApiService);

  private readonly endpoints = API_ENDPOINTS.userManagement;

  getAllStaffUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<StaffInfoResponseModel>> {
    return this.api.get<PagedResultModel<StaffInfoResponseModel>>(
      this.endpoints.getAllStaffUsersEndpoint,
      {
        params: this.buildQueryParams(query)
      }
    );
  }

  getStaffById(userId: number): Observable<StaffInfoResponseModel> {
    const url = this.buildUrl(this.endpoints.getStaffByIdEndpoint, userId);

    return this.api.get<StaffInfoResponseModel>(url);
  }

  addStaff(
    request: AddStaffRequestModel
  ): Observable<StaffInfoResponseModel> {
    return this.api.post<AddStaffRequestModel, StaffInfoResponseModel>(
      this.endpoints.addStaffEndpoint,
      request
    );
  }

  updateStaff(
    userId: number,
    request: UpdateStaffRequestModel
  ): Observable<StaffInfoResponseModel> {
    const url = this.buildUrl(this.endpoints.updateStaffEndpoint, userId);

    return this.api.put<UpdateStaffRequestModel, StaffInfoResponseModel>(
      url,
      request
    );
  }

  getAllCitizenUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<CitizenInfoResponseModel>> {
    return this.api.get<PagedResultModel<CitizenInfoResponseModel>>(
      this.endpoints.getAllCitizenUsersEndpoint,
      {
        params: this.buildQueryParams(query)
      }
    );
  }

  getCitizenById(userId: number): Observable<CitizenInfoResponseModel> {
    const url = this.buildUrl(this.endpoints.getCitizenByIdEndpoint, userId);

    return this.api.get<CitizenInfoResponseModel>(url);
  }

  updateCitizen(
    userId: number,
    request: UpdateCitizenRequestModel
  ): Observable<CitizenInfoResponseModel> {
    const url = this.buildUrl(this.endpoints.updateCitizenEndpoint, userId);

    return this.api.put<UpdateCitizenRequestModel, CitizenInfoResponseModel>(
      url,
      request
    );
  }

  activateUser(userId: number): Observable<void> {
    const url = this.buildUrl(this.endpoints.activateUserEndpoint, userId);

    return this.api.patch<Record<string, never>, void>(
      url,
      {}
    );
  }

  deactivateUser(userId: number): Observable<void> {
    const url = this.buildUrl(this.endpoints.deactivateUserEndpoint, userId);

    return this.api.patch<Record<string, never>, void>(
      url,
      {}
    );
  }

  softDeleteUser(userId: number): Observable<void> {
    const url = this.buildUrl(this.endpoints.softDeleteUserEndpoint, userId);

    return this.api.delete<void>(url);
  }

  getUsersStatistics(): Observable<UsersStatisticsResponseModel> {
    return this.api.get<UsersStatisticsResponseModel>(this.endpoints.getUsersStatisticsEndpoint);
  }

  private buildUrl(endpoint: string, userId: number): string {
    return endpoint.replace('{userId}', userId.toString());
  }

  private buildQueryParams(query: UserManagementQueryModel): HttpParams {
    let params = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize);

    if (query.searchTerm?.trim()) {
      params = params.set('searchTerm', query.searchTerm.trim());
    }

    if (query.role !== null && query.role !== undefined) {
      params = params.set('role', query.role);
    }

    if (query.isActive !== null && query.isActive !== undefined) {
      params = params.set('isActive', query.isActive);
    }

    if (query.branchId !== null && query.branchId !== undefined) {
      params = params.set('branchId', query.branchId);
    }

    if (query.hospitalId !== null && query.hospitalId !== undefined) {
      params = params.set('hospitalId', query.hospitalId);
    }

    return params;
  }
}
