import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { HospitalManagementRepository } from '../../domain/repositories/hospital-management.repository';
import { HospitalManagementApiService } from '../services/hospital-management-api.service';

import { HospitalResponseModel } from '../../domain/models/hospital-response.model';
import { HospitalStatisticsResponseModel } from '../../domain/models/hospital-statistics-response.model';
import { HospitalQueryModel } from '../../domain/models/hospital-query.model';
import { AddHospitalRequestModel } from '../../domain/models/add-hospital-request.model';
import { UpdateHospitalRequestModel } from '../../domain/models/update-hospital-request.model';
import { AvailableDoctorModel } from '../../domain/models/available-doctor.model';

@Injectable()
export class HospitalManagementRepositoryImpl extends HospitalManagementRepository {
  private readonly hospitalManagementApiService = inject(HospitalManagementApiService);

  override getAllHospitals(
    query: HospitalQueryModel
  ): Observable<PagedResultModel<HospitalResponseModel>> {
    return this.hospitalManagementApiService.getAllHospitals(query);
  }

  override getHospitalById(hospitalId: number): Observable<HospitalResponseModel> {
    return this.hospitalManagementApiService.getHospitalById(hospitalId);
  }

  override getStatistics(): Observable<HospitalStatisticsResponseModel> {
    return this.hospitalManagementApiService.getStatistics();
  }

  override getAvailableDoctors(
    currentHospitalId?: number | null
  ): Observable<AvailableDoctorModel[]> {
    return this.hospitalManagementApiService.getAvailableDoctors(currentHospitalId);
  }

  override addHospital(
    request: AddHospitalRequestModel
  ): Observable<HospitalResponseModel> {
    return this.hospitalManagementApiService.addHospital(request);
  }

  override updateHospital(
    hospitalId: number,
    request: UpdateHospitalRequestModel
  ): Observable<HospitalResponseModel> {
    return this.hospitalManagementApiService.updateHospital(hospitalId, request);
  }

  override softDeleteHospital(hospitalId: number): Observable<void> {
    return this.hospitalManagementApiService.softDeleteHospital(hospitalId);
  }

  override activateHospital(hospitalId: number): Observable<void> {
    return this.hospitalManagementApiService.activateHospital(hospitalId);
  }

  override deactivateHospital(hospitalId: number): Observable<void> {
    return this.hospitalManagementApiService.deactivateHospital(hospitalId);
  }
}
