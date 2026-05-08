import { BranchWorkingHourDto } from '../dtos/branch-working-hour.dto';
import {
  BranchDayOfWeek,
  BranchWorkingHourModel
} from '../../domain/models/branch-working-hour.model';

export class BranchWorkingHourMapper {
  static toModel(dto: BranchWorkingHourDto): BranchWorkingHourModel {
    return {
      id: dto.id,
      dayOfWeek: dto.dayOfWeek as BranchDayOfWeek,
      openTime: dto.openTime,
      closeTime: dto.closeTime,
      isClosed: dto.isClosed
    };
  }

  static toDto(model: BranchWorkingHourModel): BranchWorkingHourDto {
    return {
      id: model.id,
      dayOfWeek: model.dayOfWeek,
      openTime: model.openTime,
      closeTime: model.closeTime,
      isClosed: model.isClosed
    };
  }

}
