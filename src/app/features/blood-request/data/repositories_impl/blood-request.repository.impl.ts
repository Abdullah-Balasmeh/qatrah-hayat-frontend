import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { BloodRequestRepository } from '../../domain/repositories/blood-request.repository';
import { BloodRequestApiService } from '../services/blood-request-api.service';
import { BloodRequestMapper } from '../mappers/blood-request.mapper';

import { BloodRequestModel } from '../../domain/models/blood-request.model';
import { BloodRequestDetailsModel } from '../../domain/models/blood-request-details.model';
import { BloodRequestQueryModel } from '../../domain/models/blood-request-query.model';
import { CreateBloodRequestModel } from '../../domain/models/create-blood-request.model';
import { DoctorReviewBloodRequestModel } from '../../domain/models/doctor-review-blood-request.model';
import { EmployeeReviewBloodRequestModel } from '../../domain/models/employee-review-blood-request.model';
import { CancelBloodRequestModel } from '../../domain/models/cancel-blood-request.model';
import { CitizenDataModel } from '../../domain/models/citizen-data.model';
import { ConfirmBloodRequestAllocationModel } from '../../domain/models/confirm-blood-request-allocation.model';
import { RejectBloodRequestModel } from '../../domain/models/reject-blood-request.model';

@Injectable()
export class BloodRequestRepositoryImpl extends BloodRequestRepository {
  override confirmBloodRequestAllocation(requestId: number, request: ConfirmBloodRequestAllocationModel): Observable<BloodRequestDetailsModel> {
    throw new Error('Method not implemented.');
  }
  override rejectBloodRequest(requestId: number, request: RejectBloodRequestModel): Observable<BloodRequestDetailsModel> {
    throw new Error('Method not implemented.');
  }
  private readonly bloodRequestApiService = inject(BloodRequestApiService);
override getCurrentCitizenData(): Observable<CitizenDataModel> {
  return this.bloodRequestApiService.getCurrentCitizenData().pipe(
    map(result => BloodRequestMapper.citizenDataToModel(result))
  );
}

override lookupBeneficiaryByNationalId(
  nationalId: string
): Observable<CitizenDataModel> {
  return this.bloodRequestApiService.lookupBeneficiaryByNationalId(nationalId).pipe(
    map(result => BloodRequestMapper.citizenDataToModel(result))
  );
}
  override createBloodRequest(
    request: CreateBloodRequestModel
  ): Observable<BloodRequestDetailsModel> {
    return this.bloodRequestApiService
      .createBloodRequest(BloodRequestMapper.createRequestToDto(request))
      .pipe(
        map(result => BloodRequestMapper.detailsToModel(result))
      );
  }

  override getMyBloodRequests(
    query: BloodRequestQueryModel
  ): Observable<PagedResultModel<BloodRequestModel>> {
    return this.bloodRequestApiService.getMyBloodRequests(query).pipe(
      map(result => ({
        ...result,
        items: result.items.map(item =>
          BloodRequestMapper.bloodRequestToModel(item)
        )
      }))
    );
  }

  override getDoctorBloodRequests(
    query: BloodRequestQueryModel
  ): Observable<PagedResultModel<BloodRequestModel>> {
    return this.bloodRequestApiService.getDoctorBloodRequests(query).pipe(
      map(result => ({
        ...result,
        items: result.items.map(item =>
          BloodRequestMapper.bloodRequestToModel(item)
        )
      }))
    );
  }

  override getBranchBloodRequests(
    query: BloodRequestQueryModel
  ): Observable<PagedResultModel<BloodRequestModel>> {
    return this.bloodRequestApiService.getBranchBloodRequests(query).pipe(
      map(result => ({
        ...result,
        items: result.items.map(item =>
          BloodRequestMapper.bloodRequestToModel(item)
        )
      }))
    );
  }

  override getBloodRequestById(
    requestId: number
  ): Observable<BloodRequestDetailsModel> {
    return this.bloodRequestApiService.getBloodRequestById(requestId).pipe(
      map(result => BloodRequestMapper.detailsToModel(result))
    );
  }

  override doctorReviewBloodRequest(
    requestId: number,
    request: DoctorReviewBloodRequestModel
  ): Observable<BloodRequestDetailsModel> {
    return this.bloodRequestApiService
      .doctorReviewBloodRequest(
        requestId,
        BloodRequestMapper.doctorReviewToDto(request)
      )
      .pipe(
        map(result => BloodRequestMapper.detailsToModel(result))
      );
  }

  override employeeReviewBloodRequest(
    requestId: number,
    request: EmployeeReviewBloodRequestModel
  ): Observable<BloodRequestDetailsModel> {
    return this.bloodRequestApiService
      .employeeReviewBloodRequest(
        requestId,
        BloodRequestMapper.employeeReviewToDto(request)
      )
      .pipe(
        map(result => BloodRequestMapper.detailsToModel(result))
      );
  }

  override publishBloodRequest(
    requestId: number
  ): Observable<BloodRequestDetailsModel> {
    return this.bloodRequestApiService.publishBloodRequest(requestId).pipe(
      map(result => BloodRequestMapper.detailsToModel(result))
    );
  }

  override cancelBloodRequest(
    requestId: number,
    request: CancelBloodRequestModel
  ): Observable<BloodRequestDetailsModel> {
    return this.bloodRequestApiService
      .cancelBloodRequest(
        requestId,
        BloodRequestMapper.cancelRequestToDto(request)
      )
      .pipe(
        map(result => BloodRequestMapper.detailsToModel(result))
      );
  }
}
