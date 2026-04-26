import { Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { HospitalResponseModel } from '../models/hospital-response.model';
import { HospitalStatisticsResponseModel } from '../models/hospital-statistics-response.model';
import { HospitalQueryModel } from '../models/hospital-query.model';
import { AddHospitalRequestModel } from '../models/add-hospital-request.model';
import { UpdateHospitalRequestModel } from '../models/update-hospital-request.model';
import { AvailableDoctorModel } from '../models/available-doctor.model';

export abstract class HospitalManagementRepository {
  abstract getAllHospitals(
    query: HospitalQueryModel
  ): Observable<PagedResultModel<HospitalResponseModel>>;

  abstract getHospitalById(hospitalId: number): Observable<HospitalResponseModel>;

  abstract getStatistics(): Observable<HospitalStatisticsResponseModel>;

  abstract getAvailableDoctors(
    currentHospitalId?: number | null
  ): Observable<AvailableDoctorModel[]>;

  abstract addHospital(
    request: AddHospitalRequestModel
  ): Observable<HospitalResponseModel>;

  abstract updateHospital(
    hospitalId: number,
    request: UpdateHospitalRequestModel
  ): Observable<HospitalResponseModel>;

  abstract softDeleteHospital(hospitalId: number): Observable<void>;

  abstract activateHospital(hospitalId: number): Observable<void>;

  abstract deactivateHospital(hospitalId: number): Observable<void>;
}
