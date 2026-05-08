import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { HospitalManagementRepository } from '../../domain/repositories/hospital-management.repository';
import { HospitalManagementApiService } from '../services/hospital-management-api.service';
import { HospitalManagementMapper } from '../mappers/hospital-management.mapper';

import { HospitalModel } from '../../domain/models/hospital.model';
import { HospitalStatisticsModel } from '../../domain/models/hospital-statistics.model';
import { HospitalQueryModel } from '../../domain/models/hospital-query.model';
import { AddHospitalModel } from '../../domain/models/add-hospital.model';
import { UpdateHospitalModel } from '../../domain/models/update-hospital.model';
import { AvailableDoctorModel } from '../../domain/models/available-doctor.model';

@Injectable()
export class HospitalManagementRepositoryImpl extends HospitalManagementRepository {
  private readonly hospitalManagementApiService = inject(HospitalManagementApiService);

  override getAllHospitals(
    query: HospitalQueryModel
  ): Observable<PagedResultModel<HospitalModel>> {
    return this.hospitalManagementApiService.getAllHospitals(query).pipe(
      map(result => ({
        ...result,
        items: result.items.map(hospital =>
          HospitalManagementMapper.hospitalToModel(hospital)
        )
      }))
    );
  }

  override getHospitalById(hospitalId: number): Observable<HospitalModel> {
    return this.hospitalManagementApiService.getHospitalById(hospitalId).pipe(
      map(hospital => HospitalManagementMapper.hospitalToModel(hospital))
    );
  }

  override getStatistics(): Observable<HospitalStatisticsModel> {
    return this.hospitalManagementApiService.getStatistics().pipe(
      map(statistics => HospitalManagementMapper.statisticsToModel(statistics))
    );
  }

  override getAvailableDoctors(
    currentHospitalId?: number | null
  ): Observable<AvailableDoctorModel[]> {
    return this.hospitalManagementApiService
      .getAvailableDoctors(currentHospitalId)
      .pipe(
        map(doctors =>
          doctors.map(doctor =>
            HospitalManagementMapper.availableDoctorToModel(doctor)
          )
        )
      );
  }

  override addHospital(
    request: AddHospitalModel
  ): Observable<HospitalModel> {
    return this.hospitalManagementApiService
      .addHospital(HospitalManagementMapper.addRequestToDto(request))
      .pipe(
        map(hospital => HospitalManagementMapper.hospitalToModel(hospital))
      );
  }

  override updateHospital(
    hospitalId: number,
    request: UpdateHospitalModel
  ): Observable<HospitalModel> {
    return this.hospitalManagementApiService
      .updateHospital(
        hospitalId,
        HospitalManagementMapper.updateRequestToDto(request)
      )
      .pipe(
        map(hospital => HospitalManagementMapper.hospitalToModel(hospital))
      );
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
