import { Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { HospitalModel } from '../models/hospital.model';
import { HospitalStatisticsModel } from '../models/hospital-statistics.model';
import { HospitalQueryModel } from '../models/hospital-query.model';
import { AddHospitalModel } from '../models/add-hospital.model';
import { UpdateHospitalModel } from '../models/update-hospital.model';
import { AvailableDoctorModel } from '../models/available-doctor.model';

export abstract class HospitalManagementRepository {
  abstract getAllHospitals(
    query: HospitalQueryModel
  ): Observable<PagedResultModel<HospitalModel>>;

  abstract getHospitalById(hospitalId: number): Observable<HospitalModel>;

  abstract getStatistics(): Observable<HospitalStatisticsModel>;

  abstract getAvailableDoctors(
    currentHospitalId?: number | null
  ): Observable<AvailableDoctorModel[]>;

  abstract addHospital(
    request: AddHospitalModel
  ): Observable<HospitalModel>;

  abstract updateHospital(
    hospitalId: number,
    request: UpdateHospitalModel
  ): Observable<HospitalModel>;

  abstract softDeleteHospital(hospitalId: number): Observable<void>;

  abstract activateHospital(hospitalId: number): Observable<void>;

  abstract deactivateHospital(hospitalId: number): Observable<void>;
}
