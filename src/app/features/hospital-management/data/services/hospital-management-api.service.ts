import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';
import { PagedResultModel } from '../../../../core/models/paged-result.model';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';

import { HospitalQueryModel } from '../../domain/models/hospital-query.model';

import { HospitalResponseDto } from '../dtos/hospital-response.dto';
import { HospitalStatisticsResponseDto } from '../dtos/hospital-statistics-response.dto';
import { AddHospitalRequestDto } from '../dtos/add-hospital-request.dto';
import { UpdateHospitalRequestDto } from '../dtos/update-hospital-request.dto';
import { AvailableDoctorDto } from '../dtos/available-doctor.dto';

@Injectable({
  providedIn: 'root'
})
export class HospitalManagementApiService {
  private readonly apiService = inject(ApiService);

  getAllHospitals(
    query: HospitalQueryModel
  ): Observable<PagedResultModel<HospitalResponseDto>> {
    return this.apiService.get<PagedResultModel<HospitalResponseDto>>(
      API_ENDPOINTS.hospitalManagement.getAllHospitalsEndpoint,
      {
        params: {
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
          ...(query.searchTerm ? { searchTerm: query.searchTerm } : {}),
          ...(query.isActive !== null && query.isActive !== undefined
            ? { isActive: query.isActive }
            : {}),
          ...(query.branchId !== null && query.branchId !== undefined
            ? { branchId: query.branchId }
            : {})
        }
      }
    );
  }

  getHospitalById(hospitalId: number): Observable<HospitalResponseDto> {
    const url = API_ENDPOINTS.hospitalManagement.getHospitalByIdEndpoint
      .replace('{hospitalId}', hospitalId.toString());

    return this.apiService.get<HospitalResponseDto>(url);
  }

  getStatistics(): Observable<HospitalStatisticsResponseDto> {
    return this.apiService.get<HospitalStatisticsResponseDto>(
      API_ENDPOINTS.hospitalManagement.getHospitalsStatisticsEndpoint
    );
  }

  getAvailableDoctors(
    currentHospitalId?: number | null
  ): Observable<AvailableDoctorDto[]> {
    return this.apiService.get<AvailableDoctorDto[]>(
      API_ENDPOINTS.hospitalManagement.getAvailableDoctorsEndpoint,
      {
        params:
          currentHospitalId !== null && currentHospitalId !== undefined
            ? { currentHospitalId }
            : {}
      }
    );
  }

  addHospital(request: AddHospitalRequestDto): Observable<HospitalResponseDto> {
    return this.apiService.post<AddHospitalRequestDto, HospitalResponseDto>(
      API_ENDPOINTS.hospitalManagement.addHospitalEndpoint,
      request
    );
  }

  updateHospital(
    hospitalId: number,
    request: UpdateHospitalRequestDto
  ): Observable<HospitalResponseDto> {
    const url = API_ENDPOINTS.hospitalManagement.updateHospitalEndpoint
      .replace('{hospitalId}', hospitalId.toString());

    return this.apiService.put<UpdateHospitalRequestDto, HospitalResponseDto>(
      url,
      request
    );
  }

  softDeleteHospital(hospitalId: number): Observable<void> {
    const url = API_ENDPOINTS.hospitalManagement.softDeleteHospitalEndpoint
      .replace('{hospitalId}', hospitalId.toString());

    return this.apiService.delete<void>(url);
  }

  activateHospital(hospitalId: number): Observable<void> {
    const url = API_ENDPOINTS.hospitalManagement.activateHospitalEndpoint
      .replace('{hospitalId}', hospitalId.toString());

    return this.apiService.patch<null, void>(url, null);
  }

  deactivateHospital(hospitalId: number): Observable<void> {
    const url = API_ENDPOINTS.hospitalManagement.deactivateHospitalEndpoint
      .replace('{hospitalId}', hospitalId.toString());

    return this.apiService.patch<null, void>(url, null);
  }
}
