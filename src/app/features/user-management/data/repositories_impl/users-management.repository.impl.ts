import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersManagementRepository } from '../../domain/repositories/users-management.repository';
import { UsersManagementApiService } from '../services/users-management-api.service';

import { StaffInfoResponseModel } from '../../domain/models/staff-info-response.model';
import { CitizenInfoResponseModel } from '../../domain/models/citizen-info-response.model';
import { UserManagementQueryModel } from '../../domain/models/user-management-query.model';
import { AddStaffRequestModel } from '../../domain/models/add-staff-request.model';
import { UpdateStaffRequestModel } from '../../domain/models/update-staff-request.model';
import { UpdateCitizenRequestModel } from '../../domain/models/update-citizen-request.model';
import { PagedResultModel } from '../../../../core/models/paged-result.model';
import { UsersStatisticsResponseModel } from '../../domain/models/users-statistics-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementRepositoryImpl extends UsersManagementRepository {
  constructor(private readonly apiService: UsersManagementApiService) {
    super();
  }

  override getAllStaffUsers(query: UserManagementQueryModel): Observable<PagedResultModel<StaffInfoResponseModel>> {
    return this.apiService.getAllStaffUsers(query);
  }

  override getStaffById(userId: number): Observable<StaffInfoResponseModel> {
    return this.apiService.getStaffById(userId);
  }

  override addStaff(request: AddStaffRequestModel): Observable<StaffInfoResponseModel> {
    return this.apiService.addStaff(request);
  }

  override updateStaff(userId: number, request: UpdateStaffRequestModel): Observable<StaffInfoResponseModel> {
    return this.apiService.updateStaff(userId, request);
  }

  override getAllCitizenUsers(query: UserManagementQueryModel): Observable<PagedResultModel<CitizenInfoResponseModel>> {
    return this.apiService.getAllCitizenUsers(query);
  }

  override getCitizenById(userId: number): Observable<CitizenInfoResponseModel> {
    return this.apiService.getCitizenById(userId);
  }

  override updateCitizen(userId: number, request: UpdateCitizenRequestModel): Observable<CitizenInfoResponseModel> {
    return this.apiService.updateCitizen(userId, request);
  }

  override activateUser(userId: number): Observable<void> {
    return this.apiService.activateUser(userId);
  }

  override deactivateUser(userId: number): Observable<void> {
    return this.apiService.deactivateUser(userId);
  }

  override softDeleteUser(userId: number): Observable<void> {
    return this.apiService.softDeleteUser(userId);
  }
  override getUsersStatistics(): Observable<UsersStatisticsResponseModel> {
    return this.apiService.getUsersStatistics();
  }
}
