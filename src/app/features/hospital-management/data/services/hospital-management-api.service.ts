import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';
import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { HospitalResponseModel } from '../../domain/models/hospital-response.model';
import { HospitalStatisticsResponseModel } from '../../domain/models/hospital-statistics-response.model';
import { HospitalQueryModel } from '../../domain/models/hospital-query.model';
import { AddHospitalRequestModel } from '../../domain/models/add-hospital-request.model';
import { UpdateHospitalRequestModel } from '../../domain/models/update-hospital-request.model';
import { AvailableDoctorModel } from '../../domain/models/available-doctor.model';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class HospitalManagementApiService {
  private readonly apiService = inject(ApiService);

  getAllHospitals(
    query: HospitalQueryModel
  ): Observable<PagedResultModel<HospitalResponseModel>> {
    return this.apiService.get<PagedResultModel<HospitalResponseModel>>(
      API_ENDPOINTS.hospitalManagement.getAllHospitalsEndpoint,
      {
        params: {
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
          ...(query.searchTerm ? { searchTerm: query.searchTerm } : {}),
          ...(query.isActive !== null && query.isActive !== undefined
            ? { isActive: query.isActive }
            : {}),
          ...(query.branchId ? { branchId: query.branchId } : {})
        }
      }
    );
  }

  getHospitalById(hospitalId: number): Observable<HospitalResponseModel> {
    const url = API_ENDPOINTS.hospitalManagement.getHospitalByIdEndpoint
      .replace('{hospitalId}', hospitalId.toString());

    return this.apiService.get<HospitalResponseModel>(url);
  }

  getStatistics(): Observable<HospitalStatisticsResponseModel> {
    return this.apiService.get<HospitalStatisticsResponseModel>(
      API_ENDPOINTS.hospitalManagement.getHospitalsStatisticsEndpoint
    );
  }

  getAvailableDoctors(
    currentHospitalId?: number | null
  ): Observable<AvailableDoctorModel[]> {
    return this.apiService.get<AvailableDoctorModel[]>(
      API_ENDPOINTS.hospitalManagement.getAvailableDoctorsEndpoint,
      {
        params: currentHospitalId
          ? { currentHospitalId }
          : {}
      }
    );
  }

  addHospital(request: AddHospitalRequestModel): Observable<HospitalResponseModel> {
    return this.apiService.post<AddHospitalRequestModel, HospitalResponseModel>(
      API_ENDPOINTS.hospitalManagement.addHospitalEndpoint,
      request
    );
  }

  updateHospital(
    hospitalId: number,
    request: UpdateHospitalRequestModel
  ): Observable<HospitalResponseModel> {
    const url = API_ENDPOINTS.hospitalManagement.updateHospitalEndpoint
      .replace('{hospitalId}', hospitalId.toString());

    return this.apiService.put<UpdateHospitalRequestModel, HospitalResponseModel>(
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
