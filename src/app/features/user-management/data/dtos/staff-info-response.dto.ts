import { BaseUserInfoDto } from "../../../../core/dtos/base-user-info.dto";

export interface StaffInfoResponseDto extends BaseUserInfoDto {
  hospitalNameAr?: string | null;
  hospitalNameEn?: string | null;
  branchNameAr?: string | null;
  branchNameEn?: string | null;
}
