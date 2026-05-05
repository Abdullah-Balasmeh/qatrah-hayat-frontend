import { Observable } from 'rxjs';

import { StaffInfoModel } from '../models/staff-info.model';
import { CitizenInfoModel } from '../models/citizen-info.model';
import { UserManagementQueryModel } from '../models/user-management-query.model';
import { UpdateStaffModel } from '../models/update-staff.model';
import { UpdateCitizenModel } from '../models/update-citizen.model';
import { PagedResultModel } from '../../../../core/models/paged-result.model';
import { UsersStatisticsModel } from '../models/users-statistics.model';
import { CitizenLookupModel } from '../models/citizen-lookup.model';
import { CreateStaffFromRegistryModel } from '../models/create-staff-from-registry.model';
import { PromoteCitizenToStaffModel } from '../models/promote-citizen-to-staff.model';

export abstract class UsersManagementRepository {
  abstract getAllStaffUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<StaffInfoModel>>;

  abstract getStaffById(userId: number): Observable<StaffInfoModel>;

  abstract lookupCitizenByNationalId(
    nationalId: string
  ): Observable<CitizenLookupModel>;

  abstract createStaffFromNationalRegistry(
    request: CreateStaffFromRegistryModel
  ): Observable<StaffInfoModel>;

  abstract promoteCitizenToStaff(
    userId: number,
    request: PromoteCitizenToStaffModel
  ): Observable<StaffInfoModel>;

  abstract updateStaff(
    userId: number,
    request: UpdateStaffModel
  ): Observable<StaffInfoModel>;

  abstract getAllCitizenUsers(
    query: UserManagementQueryModel
  ): Observable<PagedResultModel<CitizenInfoModel>>;

  abstract getCitizenById(userId: number): Observable<CitizenInfoModel>;

  abstract updateCitizen(
    userId: number,
    request: UpdateCitizenModel
  ): Observable<CitizenInfoModel>;

  abstract activateUser(userId: number): Observable<void>;

  abstract deactivateUser(userId: number): Observable<void>;

  abstract softDeleteUser(userId: number): Observable<void>;

  abstract getUsersStatistics(): Observable<UsersStatisticsModel>;
}
