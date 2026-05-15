import { BloodRequestModel } from '../../domain/models/blood-request.model';
import { BloodRequestDetailsModel } from '../../domain/models/blood-request-details.model';
import { AllocatedBloodUnitModel } from '../../domain/models/allocated-blood-unit.model';
import { CitizenDataModel } from '../../domain/models/citizen-data.model';

import { CreateBloodRequestModel } from '../../domain/models/create-blood-request.model';
import { EmployeeReviewBloodRequestModel } from '../../domain/models/employee-review-blood-request.model';
import { ConfirmBloodRequestAllocationModel } from '../../domain/models/confirm-blood-request-allocation.model';
import { RejectBloodRequestModel } from '../../domain/models/reject-blood-request.model';
import { CancelBloodRequestModel } from '../../domain/models/cancel-blood-request.model';

import { BloodRequestResponseDto } from '../dtos/blood-request-response.dto';
import { BloodRequestDetailsResponseDto } from '../dtos/blood-request-details-response.dto';
import { AllocatedBloodUnitDto } from '../dtos/allocated-blood-unit.dto';
import { CitizenDataResponseDto } from '../dtos/citizen-data-response.dto';
import { EmployeeReviewBloodRequestDto } from '../dtos/employee-review-blood-request.dto';
import { ConfirmBloodRequestAllocationRequestDto } from '../dtos/confirm-blood-request-allocation-request.dto';
import { RejectBloodRequestDto } from '../dtos/reject-blood-request.dto';
import { CancelBloodRequestDto } from '../dtos/cancel-blood-request.dto';
import { CreateBloodRequestDto } from '../dtos/create-blood-request.dto';
import { DoctorReviewBloodRequestModel } from '../../domain/models/doctor-review-blood-request.model';
import { DoctorReviewBloodRequestDto } from '../dtos/doctor-review-blood-request.dto';

export class BloodRequestMapper {
  static citizenDataToModel(dto: CitizenDataResponseDto): CitizenDataModel {
    return {
      nationalId: dto.nationalId,
      fullNameAr: dto.fullNameAr,
      fullNameEn: dto.fullNameEn,
      bloodType: dto.bloodType,
      bloodTypeDisplayName: dto.bloodTypeDisplayName
    };
  }

  static bloodRequestToModel(dto: BloodRequestResponseDto): BloodRequestModel {
    return {
      id: dto.id,

      relationshipType: dto.relationshipType,

      bloodType: dto.bloodType,
      bloodTypeDisplayName: dto.bloodTypeDisplayName,

      unitsNeeded: dto.unitsNeeded,

      unitsReserved: dto.unitsReserved,
      unitsAllocated: dto.unitsAllocated,
      unitsRemaining: dto.unitsRemaining,

      urgencyLevel: dto.urgencyLevel,
      requestStatus: dto.requestStatus,

      createdAt: dto.createdAt,
      doctorApprovedAt: dto.doctorApprovedAt,
      publishedAt: dto.publishedAt,
      updatedAt: dto.updatedAt,

      beneficiaryId: dto.beneficiaryId,
      beneficiaryNationalId: dto.beneficiaryNationalId,
      beneficiaryFullNameAr: dto.beneficiaryFullNameAr,
      beneficiaryFullNameEn: dto.beneficiaryFullNameEn,

      hospitalId: dto.hospitalId,
      hospitalNameAr: dto.hospitalNameAr,
      hospitalNameEn: dto.hospitalNameEn,

      branchId: dto.branchId,
      branchNameAr: dto.branchNameAr,
      branchNameEn: dto.branchNameEn,

      requesterUserId: dto.requesterUserId,
      requesterFullNameAr: dto.requesterFullNameAr,
      requesterFullNameEn: dto.requesterFullNameEn,

      doctorId: dto.doctorId,
      doctorFullNameAr: dto.doctorFullNameAr,
      doctorFullNameEn: dto.doctorFullNameEn
    };
  }

  static detailsToModel(
    dto: BloodRequestDetailsResponseDto
  ): BloodRequestDetailsModel {
    return {
      ...this.bloodRequestToModel(dto),

      clinicalNotes: dto.clinicalNotes,

      cancellationReason: dto.cancellationReason,
      cancelledAt: dto.cancelledAt,
      cancelledByUserId: dto.cancelledByUserId,

      rejectionReason: dto.rejectionReason,
      rejectedAt: dto.rejectedAt,
      rejectedByUserId: dto.rejectedByUserId,

      publishedByUserId: dto.publishedByUserId,

      allocatedBloodUnits: dto.allocatedBloodUnits.map(unit =>
        this.allocatedUnitToModel(unit)
      )
    };
  }

  static allocatedUnitToModel(
    dto: AllocatedBloodUnitDto
  ): AllocatedBloodUnitModel {
    return {
      id: dto.id,
      unitCode: dto.unitCode,

      bloodType: dto.bloodType,
      bloodTypeDisplayName: dto.bloodTypeDisplayName,

      unitStatus: dto.unitStatus,

      collectionDate: dto.collectionDate,
      expiresAt: dto.expiresAt,
      allocatedAt: dto.allocatedAt
    };
  }

  static createRequestToDto(
    model: CreateBloodRequestModel
  ): CreateBloodRequestDto {
    return {
      relationshipType: model.relationshipType,
      hospitalId: model.hospitalId,
      doctorId: model.doctorId,
      beneficiaryNationalId: model.beneficiaryNationalId ?? null
    };
  }

  static doctorReviewToDto(
    model: DoctorReviewBloodRequestModel
  ): DoctorReviewBloodRequestDto {
    return {
      isApproved: model.isApproved,
      bloodType: model.bloodType ?? null,
      unitsNeeded: model.unitsNeeded ?? null,
      urgencyLevel: model.urgencyLevel ?? null,
      clinicalNotes: model.clinicalNotes ?? null,
      rejectionReason: model.rejectionReason ?? null
    };
  }

  static employeeReviewToDto(
    model: EmployeeReviewBloodRequestModel
  ): EmployeeReviewBloodRequestDto {
    return {
      reserveAvailableUnits: model.reserveAvailableUnits
    };
  }

  static confirmAllocationToDto(
    model: ConfirmBloodRequestAllocationModel
  ): ConfirmBloodRequestAllocationRequestDto {
    return {
      confirmReservedUnits: model.confirmReservedUnits
    };
  }

  static rejectRequestToDto(
    model: RejectBloodRequestModel
  ): RejectBloodRequestDto {
    return {
      rejectionReason: model.rejectionReason
    };
  }

  static cancelRequestToDto(
    model: CancelBloodRequestModel
  ): CancelBloodRequestDto {
    return {
      cancellationReason: model.cancellationReason
    };
  }
}
