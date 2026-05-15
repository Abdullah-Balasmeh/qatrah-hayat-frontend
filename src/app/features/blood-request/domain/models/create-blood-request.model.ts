import { RelationshipType } from '../enums/relationship-type.enum';

export interface CreateBloodRequestModel {
  relationshipType: RelationshipType;
  hospitalId: number;
  doctorId: number;
  beneficiaryNationalId?: string | null;
}
