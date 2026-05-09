import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';

import { PagedResultDto } from '../../../../core/dtos/paged-result.dto';

import { StaffInfoResponseDto } from '../dtos/staff-info-response.dto';
import { CitizenInfoResponseDto } from '../dtos/citizen-info-response.dto';
import { CitizenLookupResponseDto } from '../dtos/citizen-lookup-response.dto';
import { CreateStaffFromRegistryRequestDto } from '../dtos/create-staff-from-registry-request.dto';
import { PromoteCitizenToStaffRequestDto } from '../dtos/promote-citizen-to-staff-request.dto';
import { UpdateStaffRequestDto } from '../dtos/update-staff-request.dto';
import { UpdateCitizenRequestDto } from '../dtos/update-citizen-request.dto';
import { UsersStatisticsResponseDto } from '../dtos/users-statistics-response.dto';
import { UserManagementQueryDto } from '../dtos/user-management-query.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementApiService {
  private readonly api = inject(ApiService);
  private readonly endpoints = API_ENDPOINTS.userManagement;

  getAllStaffUsers(
    query: UserManagementQueryDto
  ): Observable<PagedResultDto<StaffInfoResponseDto>> {
    return this.api.get<PagedResultDto<StaffInfoResponseDto>>(
      this.endpoints.getAllStaffUsersEndpoint,
      {
        params: this.buildQueryParams(query)
      }
    );
  }

  getStaffById(userId: number): Observable<StaffInfoResponseDto> {
    const url = this.buildUserUrl(this.endpoints.getStaffByIdEndpoint, userId);

    return this.api.get<StaffInfoResponseDto>(url);
  }

  lookupCitizenByNationalId(
    nationalId: string
  ): Observable<CitizenLookupResponseDto> {
    const url = this.endpoints.lookupCitizenEndpoint.replace(
      '{nationalId}',
      nationalId
    );

    return this.api.get<CitizenLookupResponseDto>(url);
  }

  createStaffFromNationalRegistry(
    request: CreateStaffFromRegistryRequestDto
  ): Observable<StaffInfoResponseDto> {
    return this.api.post<
      CreateStaffFromRegistryRequestDto,
      StaffInfoResponseDto
    >(
      this.endpoints.createStaffFromNationalRegistryEndpoint,
      request
    );
  }

  promoteCitizenToStaff(
    userId: number,
    request: PromoteCitizenToStaffRequestDto
  ): Observable<StaffInfoResponseDto> {
    const url = this.buildUserUrl(
      this.endpoints.promoteCitizenToStaffEndpoint,
      userId
    );

    return this.api.post<
      PromoteCitizenToStaffRequestDto,
      StaffInfoResponseDto
    >(
      url,
      request
    );
  }

  updateStaff(
    userId: number,
    request: UpdateStaffRequestDto
  ): Observable<StaffInfoResponseDto> {
    const url = this.buildUserUrl(this.endpoints.updateStaffEndpoint, userId);

    return this.api.put<UpdateStaffRequestDto, StaffInfoResponseDto>(
      url,
      request
    );
  }

  getAllCitizenUsers(
    query: UserManagementQueryDto
  ): Observable<PagedResultDto<CitizenInfoResponseDto>> {
    return this.api.get<PagedResultDto<CitizenInfoResponseDto>>(
      this.endpoints.getAllCitizenUsersEndpoint,
      {
        params: this.buildQueryParams(query)
      }
    );
  }

  getCitizenById(userId: number): Observable<CitizenInfoResponseDto> {
    const url = this.buildUserUrl(this.endpoints.getCitizenByIdEndpoint, userId);

    return this.api.get<CitizenInfoResponseDto>(url);
  }

  updateCitizen(
    userId: number,
    request: UpdateCitizenRequestDto
  ): Observable<CitizenInfoResponseDto> {
    const url = this.buildUserUrl(this.endpoints.updateCitizenEndpoint, userId);

    return this.api.put<UpdateCitizenRequestDto, CitizenInfoResponseDto>(
      url,
      request
    );
  }

  activateUser(userId: number): Observable<void> {
    const url = this.buildUserUrl(this.endpoints.activateUserEndpoint, userId);

    return this.api.patch<null, void>(url, null);
  }

  deactivateUser(userId: number): Observable<void> {
    const url = this.buildUserUrl(this.endpoints.deactivateUserEndpoint, userId);

    return this.api.patch<null, void>(url, null);
  }

  softDeleteUser(userId: number): Observable<void> {
    const url = this.buildUserUrl(this.endpoints.softDeleteUserEndpoint, userId);

    return this.api.delete<void>(url);
  }

  getUsersStatistics(): Observable<UsersStatisticsResponseDto> {
    return this.api.get<UsersStatisticsResponseDto>(
      this.endpoints.getUsersStatisticsEndpoint
    );
  }

  private buildUserUrl(endpoint: string, userId: number): string {
    return endpoint.replace('{userId}', userId.toString());
  }

  private buildQueryParams(query: UserManagementQueryDto): HttpParams {
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
