import { AvailableBranchManagerModel } from '../../domain/models/available-branch-manager.model';

import { AddBranchRequestDto } from '../dtos/add-branch-request.dto';
import { UpdateBranchRequestDto } from '../dtos/update-branch-request.dto';
import { BranchResponseDto } from '../dtos/branch-response.dto';
import { BranchStatisticsResponseDto } from '../dtos/branch-statistics-response.dto';
import { AvailableBranchManagerDto } from '../dtos/available-branch-manager.dto';

import { BranchWorkingHourMapper } from './branch-working-hour.mapper';
import { BranchInfoModel } from '../../domain/models/branch-info.model';
import { AddBranchModel } from '../../domain/models/add-branch.model';
import { UpdateBranchModel } from '../../domain/models/update-branch.model';
import { BranchStatisticsModel } from '../../domain/models/branch-statistics.model';

export class BranchManagementMapper {
  static branchToModel(dto: BranchResponseDto): BranchInfoModel {
    return {
      id: dto.id,
      branchNameAr: dto.branchNameAr,
      branchNameEn: dto.branchNameEn,
      addressAr: dto.addressAr,
      addressEn: dto.addressEn,
      managerUserId: dto.managerUserId,
      managerFullNameAr: dto.managerFullNameAr,
      managerFullNameEn: dto.managerFullNameEn,
      isActive: dto.isActive,
      isDeleted: dto.isDeleted,
      createdAt: dto.createdAt,
      gpsLat: dto.gpsLat,
      gpsLng: dto.gpsLng,
      email: dto.email,
      phone: dto.phone,
      updatedAt: dto.updatedAt,
      workingHours: dto.workingHours?.map(BranchWorkingHourMapper.toModel) ?? []
    };
  }

  static addRequestToDto(model: AddBranchModel): AddBranchRequestDto {
    return {
      branchNameAr: model.branchNameAr,
      branchNameEn: model.branchNameEn,
      addressAr: model.addressAr,
      addressEn: model.addressEn,
      managerUserId: model.managerUserId,
      gpsLat: model.gpsLat,
      gpsLng: model.gpsLng,
      email: model.email,
      phone: model.phone,
      workingHours: model.workingHours.map(BranchWorkingHourMapper.toDto)
    };
  }

  static updateRequestToDto(model: UpdateBranchModel): UpdateBranchRequestDto {
    return {
      branchNameAr: model.branchNameAr,
      branchNameEn: model.branchNameEn,
      addressAr: model.addressAr,
      addressEn: model.addressEn,
      managerUserId: model.managerUserId,
      isActive: model.isActive,
      gpsLat: model.gpsLat,
      gpsLng: model.gpsLng,
      email: model.email,
      phone: model.phone,
      workingHours: model.workingHours.map((wh) => BranchWorkingHourMapper.toDto(wh))
    };
  }

  static statisticsToModel(dto: BranchStatisticsResponseDto): BranchStatisticsModel {
    return {
      totalBranches: dto.totalBranches,
      activeBranches: dto.activeBranches,
      inactiveBranches: dto.inactiveBranches,
      lastUpdate: dto.lastUpdate
    };
  }

  static availableManagerToModel(dto: AvailableBranchManagerDto): AvailableBranchManagerModel {
    return {
      userId: dto.userId,
      fullNameAr: dto.fullNameAr,
      fullNameEn: dto.fullNameEn
    };
  }
}
