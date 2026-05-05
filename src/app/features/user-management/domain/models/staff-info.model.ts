import { BaseUserInfoModel } from "../../../../core/models/base-user-info.model";


export interface StaffInfoModel extends BaseUserInfoModel {
  hospitalNameAr?: string | null;
  hospitalNameEn?: string | null;
  branchNameAr?: string | null;
  branchNameEn?: string | null;
}
