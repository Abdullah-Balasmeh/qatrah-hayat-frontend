import { Observable } from 'rxjs';

import { PagedResultModel } from '../../../../core/models/paged-result.model';

import { CitizenDataModel } from '../models/citizen-data.model';
import { BloodRequestModel } from '../models/blood-request.model';
import { BloodRequestDetailsModel } from '../models/blood-request-details.model';
import { BloodRequestQueryModel } from '../models/blood-request-query.model';
import { CreateBloodRequestModel } from '../models/create-blood-request.model';
import { DoctorReviewBloodRequestModel } from '../models/doctor-review-blood-request.model';
import { EmployeeReviewBloodRequestModel } from '../models/employee-review-blood-request.model';
import { ConfirmBloodRequestAllocationModel } from '../models/confirm-blood-request-allocation.model';
import { RejectBloodRequestModel } from '../models/reject-blood-request.model';
import { CancelBloodRequestModel } from '../models/cancel-blood-request.model';

export abstract class BloodRequestRepository {
  abstract getCurrentCitizenData(): Observable<CitizenDataModel>;

  abstract lookupBeneficiaryByNationalId(
    nationalId: string
  ): Observable<CitizenDataModel>;

  abstract createBloodRequest(
    request: CreateBloodRequestModel
  ): Observable<BloodRequestDetailsModel>;

  abstract getMyBloodRequests(
    query: BloodRequestQueryModel
  ): Observable<PagedResultModel<BloodRequestModel>>;

  abstract getDoctorBloodRequests(
    query: BloodRequestQueryModel
  ): Observable<PagedResultModel<BloodRequestModel>>;

  abstract getBranchBloodRequests(
    query: BloodRequestQueryModel
  ): Observable<PagedResultModel<BloodRequestModel>>;

  abstract getBloodRequestById(
    requestId: number
  ): Observable<BloodRequestDetailsModel>;

  abstract doctorReviewBloodRequest(
    requestId: number,
    request: DoctorReviewBloodRequestModel
  ): Observable<BloodRequestDetailsModel>;

  abstract employeeReviewBloodRequest(
    requestId: number,
    request: EmployeeReviewBloodRequestModel
  ): Observable<BloodRequestDetailsModel>;

  abstract confirmBloodRequestAllocation(
    requestId: number,
    request: ConfirmBloodRequestAllocationModel
  ): Observable<BloodRequestDetailsModel>;

  abstract publishBloodRequest(
    requestId: number
  ): Observable<BloodRequestDetailsModel>;

  abstract rejectBloodRequest(
    requestId: number,
    request: RejectBloodRequestModel
  ): Observable<BloodRequestDetailsModel>;

  abstract cancelBloodRequest(
    requestId: number,
    request: CancelBloodRequestModel
  ): Observable<BloodRequestDetailsModel>;
}
