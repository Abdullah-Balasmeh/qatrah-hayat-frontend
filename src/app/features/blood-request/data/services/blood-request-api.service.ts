import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';
import { PagedResultModel } from '../../../../core/models/paged-result.model';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';

import { BloodRequestQueryModel } from '../../domain/models/blood-request-query.model';

import { CreateBloodRequestDto } from '../dtos/create-blood-request.dto';
import { BloodRequestResponseDto } from '../dtos/blood-request-response.dto';
import { BloodRequestDetailsResponseDto } from '../dtos/blood-request-details-response.dto';
import { EmployeeReviewBloodRequestDto } from '../dtos/employee-review-blood-request.dto';
import { CancelBloodRequestDto } from '../dtos/cancel-blood-request.dto';
import { DoctorReviewBloodRequestDto } from '../dtos/doctor-review-blood-request.dto';
import { CitizenDataResponseDto } from '../dtos/citizen-data-response.dto';

@Injectable({
  providedIn: 'root'
})
export class BloodRequestApiService {
  private readonly apiService = inject(ApiService);
  getCurrentCitizenData(): Observable<CitizenDataResponseDto> {
  return this.apiService.get<CitizenDataResponseDto>(
    API_ENDPOINTS.bloodRequests.getCurrentCitizenDataEndpoint
  );
}

lookupBeneficiaryByNationalId(
  nationalId: string
): Observable<CitizenDataResponseDto> {
  const url = API_ENDPOINTS.bloodRequests.lookupBeneficiaryEndpoint
    .replace('{nationalId}', nationalId);

  return this.apiService.get<CitizenDataResponseDto>(url);
}

  createBloodRequest(
    request: CreateBloodRequestDto
  ): Observable<BloodRequestDetailsResponseDto> {
    return this.apiService.post<
      CreateBloodRequestDto,
      BloodRequestDetailsResponseDto
    >(
      API_ENDPOINTS.bloodRequests.createBloodRequestEndpoint,
      request
    );
  }

  getMyBloodRequests(
    query: BloodRequestQueryModel
  ): Observable<PagedResultModel<BloodRequestResponseDto>> {
    return this.apiService.get<PagedResultModel<BloodRequestResponseDto>>(
      API_ENDPOINTS.bloodRequests.getMyBloodRequestsEndpoint,
      {
        params: this.buildQueryParams(query)
      }
    );
  }

  getDoctorBloodRequests(
    query: BloodRequestQueryModel
  ): Observable<PagedResultModel<BloodRequestResponseDto>> {
    return this.apiService.get<PagedResultModel<BloodRequestResponseDto>>(
      API_ENDPOINTS.bloodRequests.getDoctorBloodRequestsEndpoint,
      {
        params: this.buildQueryParams(query)
      }
    );
  }

  getBranchBloodRequests(
    query: BloodRequestQueryModel
  ): Observable<PagedResultModel<BloodRequestResponseDto>> {
    return this.apiService.get<PagedResultModel<BloodRequestResponseDto>>(
      API_ENDPOINTS.bloodRequests.getBranchBloodRequestsEndpoint,
      {
        params: this.buildQueryParams(query)
      }
    );
  }

  getBloodRequestById(
    requestId: number
  ): Observable<BloodRequestDetailsResponseDto> {
    const url = API_ENDPOINTS.bloodRequests.getBloodRequestByIdEndpoint
      .replace('{requestId}', requestId.toString());

    return this.apiService.get<BloodRequestDetailsResponseDto>(url);
  }

  doctorReviewBloodRequest(
    requestId: number,
    request: DoctorReviewBloodRequestDto
  ): Observable<BloodRequestDetailsResponseDto> {
    const url = API_ENDPOINTS.bloodRequests.doctorReviewBloodRequestEndpoint
      .replace('{requestId}', requestId.toString());

    return this.apiService.patch<
      DoctorReviewBloodRequestDto,
      BloodRequestDetailsResponseDto
    >(
      url,
      request
    );
  }

  employeeReviewBloodRequest(
    requestId: number,
    request: EmployeeReviewBloodRequestDto
  ): Observable<BloodRequestDetailsResponseDto> {
    const url = API_ENDPOINTS.bloodRequests.employeeReviewBloodRequestEndpoint
      .replace('{requestId}', requestId.toString());

    return this.apiService.patch<
      EmployeeReviewBloodRequestDto,
      BloodRequestDetailsResponseDto
    >(
      url,
      request
    );
  }

  publishBloodRequest(
    requestId: number
  ): Observable<BloodRequestDetailsResponseDto> {
    const url = API_ENDPOINTS.bloodRequests.publishBloodRequestEndpoint
      .replace('{requestId}', requestId.toString());

    return this.apiService.patch<null, BloodRequestDetailsResponseDto>(
      url,
      null
    );
  }

  cancelBloodRequest(
    requestId: number,
    request: CancelBloodRequestDto
  ): Observable<BloodRequestDetailsResponseDto> {
    const url = API_ENDPOINTS.bloodRequests.cancelBloodRequestEndpoint
      .replace('{requestId}', requestId.toString());

    return this.apiService.patch<
      CancelBloodRequestDto,
      BloodRequestDetailsResponseDto
    >(
      url,
      request
    );
  }

  private buildQueryParams(query: BloodRequestQueryModel): Record<string, string | number | boolean> {
    return {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      ...(query.searchTerm ? { searchTerm: query.searchTerm } : {}),
      ...(query.requestStatus !== null && query.requestStatus !== undefined
        ? { requestStatus: query.requestStatus }
        : {}),
      ...(query.bloodType !== null && query.bloodType !== undefined
        ? { bloodType: query.bloodType }
        : {}),
      ...(query.urgencyLevel !== null && query.urgencyLevel !== undefined
        ? { urgencyLevel: query.urgencyLevel }
        : {}),
      ...(query.hospitalId !== null && query.hospitalId !== undefined
        ? { hospitalId: query.hospitalId }
        : {}),
      ...(query.branchId !== null && query.branchId !== undefined
        ? { branchId: query.branchId }
        : {}),
      ...(query.fromDate ? { fromDate: query.fromDate } : {}),
      ...(query.toDate ? { toDate: query.toDate } : {})
    };
  }
}
