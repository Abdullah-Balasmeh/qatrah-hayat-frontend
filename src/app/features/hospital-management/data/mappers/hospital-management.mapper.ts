import { HospitalModel } from '../../domain/models/hospital.model';
import { HospitalStatisticsModel } from '../../domain/models/hospital-statistics.model';
import { AddHospitalModel } from '../../domain/models/add-hospital.model';
import { UpdateHospitalModel } from '../../domain/models/update-hospital.model';
import { AvailableDoctorModel } from '../../domain/models/available-doctor.model';

import { HospitalResponseDto } from '../dtos/hospital-response.dto';
import { HospitalStatisticsResponseDto } from '../dtos/hospital-statistics-response.dto';
import { AddHospitalRequestDto } from '../dtos/add-hospital-request.dto';
import { UpdateHospitalRequestDto } from '../dtos/update-hospital-request.dto';
import { AvailableDoctorDto } from '../dtos/available-doctor.dto';

export class HospitalManagementMapper {
  static hospitalToModel(dto: HospitalResponseDto): HospitalModel {
    return {
      id: dto.id,

      hospitalNameAr: dto.hospitalNameAr,
      hospitalNameEn: dto.hospitalNameEn,

      addressAr: dto.addressAr,
      addressEn: dto.addressEn,

      isActive: dto.isActive,
      isDeleted: dto.isDeleted,

      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,

      branchId: dto.branchId,
      branchNameAr: dto.branchNameAr,
      branchNameEn: dto.branchNameEn
    };
  }

  static addRequestToDto(model: AddHospitalModel): AddHospitalRequestDto {
    return {
      hospitalNameAr: model.hospitalNameAr,
      hospitalNameEn: model.hospitalNameEn,

      addressAr: model.addressAr,
      addressEn: model.addressEn,

      branchId: model.branchId
    };
  }

  static updateRequestToDto(model: UpdateHospitalModel): UpdateHospitalRequestDto {
    return {
      hospitalNameAr: model.hospitalNameAr,
      hospitalNameEn: model.hospitalNameEn,

      addressAr: model.addressAr,
      addressEn: model.addressEn,

      branchId: model.branchId,

      isActive: model.isActive
    };
  }

  static statisticsToModel(
    dto: HospitalStatisticsResponseDto
  ): HospitalStatisticsModel {
    return {
      totalHospitals: dto.totalHospitals,
      activeHospitals: dto.activeHospitals,
      inactiveHospitals: dto.inactiveHospitals,
      lastUpdate: dto.lastUpdate
    };
  }

  static availableDoctorToModel(dto: AvailableDoctorDto): AvailableDoctorModel {
    return {
      userId: dto.userId,
      fullNameAr: dto.fullNameAr,
      fullNameEn: dto.fullNameEn
    };
  }
}
