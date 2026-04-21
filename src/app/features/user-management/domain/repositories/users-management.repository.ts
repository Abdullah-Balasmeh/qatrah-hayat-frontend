import { Observable } from 'rxjs';

import { StaffInfoResponseModel } from '../models/staff-info-response.model';
import { CitizenInfoResponseModel } from '../models/citizen-info-response.model';
import { UserManagementQueryModel } from '../models/user-management-query.model';
import { UpdateStaffRequestModel } from '../models/update-staff-request.model';
import { UpdateCitizenRequestModel } from '../models/update-citizen-request.model';
import { PagedResultModel } from '../../../../core/models/paged-result.model';
import { UsersStatisticsResponseModel } from '../models/users-statistics-response.model';
import { CitizenLookupResponseModel } from '../models/citizen-lookup-response.model';
import { CreateStaffFromRegistryRequestModel } from '../models/create-staff-from-registry-request.model';
import { PromoteCitizenToStaffRequestModel } from '../models/promote-citizen-to-staff-request.model';

export abstract class UsersManagementRepository {
  abstract getAllStaffUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<StaffInfoResponseModel>>;

  abstract getStaffById(userId: number): Observable<StaffInfoResponseModel>;

  abstract lookupCitizenByNationalId(
    nationalId: string
  ): Observable<CitizenLookupResponseModel>;

  abstract createStaffFromNationalRegistry(
    request: CreateStaffFromRegistryRequestModel
  ): Observable<StaffInfoResponseModel>;

  abstract promoteCitizenToStaff(
    userId: number,
    request: PromoteCitizenToStaffRequestModel
  ): Observable<StaffInfoResponseModel>;

  abstract updateStaff(
    userId: number,
    request: UpdateStaffRequestModel
  ): Observable<StaffInfoResponseModel>;

  abstract getAllCitizenUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<CitizenInfoResponseModel>>;

  abstract getCitizenById(userId: number): Observable<CitizenInfoResponseModel>;

  abstract updateCitizen(
    userId: number,
    request: UpdateCitizenRequestModel
  ): Observable<CitizenInfoResponseModel>;

  abstract activateUser(userId: number): Observable<void>;

  abstract deactivateUser(userId: number): Observable<void>;

  abstract softDeleteUser(userId: number): Observable<void>;

  abstract getUsersStatistics(): Observable<UsersStatisticsResponseModel>;
}
