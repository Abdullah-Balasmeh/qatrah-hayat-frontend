import { RelationshipType } from '../../domain/enums/relationship-type.enum';

export interface CreateBloodRequestDto {
  relationshipType: RelationshipType;
  hospitalId: number;
  doctorId: number;
  beneficiaryNationalId?: string | null;
}
