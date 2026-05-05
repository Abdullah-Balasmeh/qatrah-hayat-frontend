import { UsersStatisticsResponseDto } from "../dtos/users-statistics-response.dto";
import { UsersStatisticsModel } from "../../domain/models/users-statistics.model";

export function mapUsersStatisticsResponseDtoToModel(
  dto: UsersStatisticsResponseDto
): UsersStatisticsModel {
  return {
    totalUsers: dto.totalUsers,
    totalStaff: dto.totalStaff,
    totalCitizens: dto.totalCitizens,
    lastUpdate: dto.lastUpdate,
  };
}