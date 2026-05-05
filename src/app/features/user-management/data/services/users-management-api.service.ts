import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StaffInfoModel } from '../../domain/models/staff-info.model';
import { CitizenInfoModel } from '../../domain/models/citizen-info.model';
import { UserManagementQueryModel } from '../../domain/models/user-management-query.model';
import { UpdateStaffModel } from '../../domain/models/update-staff.model';
import { UpdateCitizenModel } from '../../domain/models/update-citizen.model';

import { PagedResultModel } from '../../../../core/models/paged-result.model';
import { ApiService } from '../../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { UsersStatisticsModel } from '../../domain/models/users-statistics.model';
import { CitizenLookupModel } from '../../domain/models/citizen-lookup.model';
import { CreateStaffFromRegistryModel } from '../../domain/models/create-staff-from-registry.model';
import { PromoteCitizenToStaffModel } from '../../domain/models/promote-citizen-to-staff.model';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementApiService {
  private readonly api = inject(ApiService);

  private readonly endpoints = API_ENDPOINTS.userManagement;

  getAllStaffUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<StaffInfoModel>> {
    return this.api.get<PagedResultModel<StaffInfoModel>>(
      this.endpoints.getAllStaffUsersEndpoint,
      {
        params: this.buildQueryParams(query)
      }
    );
  }

  getStaffById(userId: number): Observable<StaffInfoModel> {
    const url = this.buildUserUrl(this.endpoints.getStaffByIdEndpoint, userId);

    return this.api.get<StaffInfoModel>(url);
  }

  lookupCitizenByNationalId(
    nationalId: string
  ): Observable<CitizenLookupModel> {
    const url = this.endpoints.lookupCitizenEndpoint.replace(
      '{nationalId}',
      nationalId
    );

    return this.api.get<CitizenLookupModel>(url);
  }

  createStaffFromNationalRegistry(
    request: CreateStaffFromRegistryModel
  ): Observable<StaffInfoModel> {
    return this.api.post<
      CreateStaffFromRegistryModel,
      StaffInfoModel
    >(
      this.endpoints.createStaffFromNationalRegistryEndpoint,
      request
    );
  }

  promoteCitizenToStaff(
    userId: number,
    request: PromoteCitizenToStaffModel
  ): Observable<StaffInfoModel> {
    const url = this.buildUserUrl(
      this.endpoints.promoteCitizenToStaffEndpoint,
      userId
    );

    return this.api.post<
      PromoteCitizenToStaffModel,
      StaffInfoModel
    >(
      url,
      request
    );
  }

  updateStaff(
    userId: number,
    request: UpdateStaffModel
  ): Observable<StaffInfoModel> {
    const url = this.buildUserUrl(this.endpoints.updateStaffEndpoint, userId);

    return this.api.put<UpdateStaffModel, StaffInfoModel>(
      url,
      request
    );
  }

  getAllCitizenUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<CitizenInfoModel>> {
    return this.api.get<PagedResultModel<CitizenInfoModel>>(
      this.endpoints.getAllCitizenUsersEndpoint,
      {
        params: this.buildQueryParams(query)
      }
    );
  }

  getCitizenById(userId: number): Observable<CitizenInfoModel> {
    const url = this.buildUserUrl(this.endpoints.getCitizenByIdEndpoint, userId);

    return this.api.get<CitizenInfoModel>(url);
  }

  updateCitizen(
    userId: number,
    request: UpdateCitizenModel
  ): Observable<CitizenInfoModel> {
    const url = this.buildUserUrl(this.endpoints.updateCitizenEndpoint, userId);

    return this.api.put<UpdateCitizenModel, CitizenInfoModel>(
      url,
      request
    );
  }

  activateUser(userId: number): Observable<void> {
    const url = this.buildUserUrl(this.endpoints.activateUserEndpoint, userId);

    return this.api.patch<Record<string, never>, void>(url, {});
  }

  deactivateUser(userId: number): Observable<void> {
    const url = this.buildUserUrl(this.endpoints.deactivateUserEndpoint, userId);

    return this.api.patch<Record<string, never>, void>(url, {});
  }

  softDeleteUser(userId: number): Observable<void> {
    const url = this.buildUserUrl(this.endpoints.softDeleteUserEndpoint, userId);

    return this.api.delete<void>(url);
  }

  getUsersStatistics(): Observable<UsersStatisticsModel> {
    return this.api.get<UsersStatisticsModel>(
      this.endpoints.getUsersStatisticsEndpoint
    );
  }

  private buildUserUrl(endpoint: string, userId: number): string {
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
