import { BaseUserInfoModel } from "../../../../core/models/base-user-info.model";


export interface StaffInfoResponseModel extends BaseUserInfoModel {
  hospitalNameAr?: string | null;
  hospitalNameEn?: string | null;
  branchNameAr?: string | null;
  branchNameEn?: string | null;
}
