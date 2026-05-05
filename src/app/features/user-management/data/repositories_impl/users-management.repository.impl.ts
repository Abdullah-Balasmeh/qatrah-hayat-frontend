import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { UsersManagementRepository } from '../../domain/repositories/users-management.repository';
import { UsersManagementApiService } from '../services/users-management-api.service';

import { StaffInfoModel } from '../../domain/models/staff-info.model';
import { CitizenInfoModel } from '../../domain/models/citizen-info.model';
import { UserManagementQueryModel } from '../../domain/models/user-management-query.model';
import { UpdateStaffModel } from '../../domain/models/update-staff.model';
import { UpdateCitizenModel } from '../../domain/models/update-citizen.model';
import { PagedResultModel } from '../../../../core/models/paged-result.model';
import { UsersStatisticsModel } from '../../domain/models/users-statistics.model';
import { CitizenLookupModel } from '../../domain/models/citizen-lookup.model';
import { CreateStaffFromRegistryModel } from '../../domain/models/create-staff-from-registry.model';
import { PromoteCitizenToStaffModel } from '../../domain/models/promote-citizen-to-staff.model';

import { mapPagedResultDtoToModel } from '../mappers/paged-result.mapper';
import { mapStaffInfoResponseDtoToModel } from '../mappers/staff-info.mapper';
import { mapCitizenInfoResponseDtoToModel } from '../mappers/citizen-info.mapper';
import { mapCitizenLookupResponseDtoToModel } from '../mappers/citizen-lookup.mapper';
import { mapUsersStatisticsResponseDtoToModel } from '../mappers/users-statistics.mapper';

import { mapCreateStaffFromRegistryModelToDto } from '../mappers/create-staff-from-registry-request.mapper';
import { mapPromoteCitizenToStaffModelToDto } from '../mappers/promote-citizen-to-staff-request.mapper';
import { mapUpdateStaffModelToDto } from '../mappers/update-staff-request.mapper';
import { mapUpdateCitizenModelToDto } from '../mappers/update-citizen-request.mapper';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementRepositoryImpl extends UsersManagementRepository {
  constructor(private readonly apiService: UsersManagementApiService) {
    super();
  }

  override getAllStaffUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<StaffInfoModel>> {
    return this.apiService.getAllStaffUsers(query).pipe(
      map(dto =>
        mapPagedResultDtoToModel(dto, mapStaffInfoResponseDtoToModel)
      )
    );
  }

  override getStaffById(userId: number): Observable<StaffInfoModel> {
    return this.apiService.getStaffById(userId).pipe(
      map(dto => mapStaffInfoResponseDtoToModel(dto))
    );
  }

  override lookupCitizenByNationalId(
    nationalId: string
  ): Observable<CitizenLookupModel> {
    return this.apiService.lookupCitizenByNationalId(nationalId).pipe(
      map(dto => mapCitizenLookupResponseDtoToModel(dto))
    );
  }

  override createStaffFromNationalRegistry(
    request: CreateStaffFromRegistryModel
  ): Observable<StaffInfoModel> {
    const dto = mapCreateStaffFromRegistryModelToDto(request);

    return this.apiService.createStaffFromNationalRegistry(dto).pipe(
      map(responseDto => mapStaffInfoResponseDtoToModel(responseDto))
    );
  }

  override promoteCitizenToStaff(
    userId: number,
    request: PromoteCitizenToStaffModel
  ): Observable<StaffInfoModel> {
    const dto = mapPromoteCitizenToStaffModelToDto(request);

    return this.apiService.promoteCitizenToStaff(userId, dto).pipe(
      map(responseDto => mapStaffInfoResponseDtoToModel(responseDto))
    );
  }

  override updateStaff(
    userId: number,
    request: UpdateStaffModel
  ): Observable<StaffInfoModel> {
    const dto = mapUpdateStaffModelToDto(request);

    return this.apiService.updateStaff(userId, dto).pipe(
      map(responseDto => mapStaffInfoResponseDtoToModel(responseDto))
    );
  }

  override getAllCitizenUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<CitizenInfoModel>> {
    return this.apiService.getAllCitizenUsers(query).pipe(
      map(dto =>
        mapPagedResultDtoToModel(dto, mapCitizenInfoResponseDtoToModel)
      )
    );
  }

  override getCitizenById(userId: number): Observable<CitizenInfoModel> {
    return this.apiService.getCitizenById(userId).pipe(
      map(dto => mapCitizenInfoResponseDtoToModel(dto))
    );
  }

  override updateCitizen(
    userId: number,
    request: UpdateCitizenModel
  ): Observable<CitizenInfoModel> {
    const dto = mapUpdateCitizenModelToDto(request);

    return this.apiService.updateCitizen(userId, dto).pipe(
      map(responseDto => mapCitizenInfoResponseDtoToModel(responseDto))
    );
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

  override getUsersStatistics(): Observable<UsersStatisticsModel> {
    return this.apiService.getUsersStatistics().pipe(
      map(dto => mapUsersStatisticsResponseDtoToModel(dto))
    );
  }
}

