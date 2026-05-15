export enum RelationshipType {
  Self = 1,
  Parent = 2,
  Child = 3,
  Sibling = 4,
  Spouse = 5,
  Other = 6
}

export const RELATIONSHIP_TYPE_OPTIONS = [
  {
    value: RelationshipType.Self,
    label: 'Blood-Request-Relationship-Keys.SELF'
  },
  {
    value: RelationshipType.Parent,
    label: 'Blood-Request-Relationship-Keys.PARENT'
  },
  {
    value: RelationshipType.Child,
    label: 'Blood-Request-Relationship-Keys.CHILD'
  },
  {
    value: RelationshipType.Sibling,
    label: 'Blood-Request-Relationship-Keys.SIBLING'
  },
  {
    value: RelationshipType.Spouse,
    label: 'Blood-Request-Relationship-Keys.SPOUSE'
  },
  {
    value: RelationshipType.Other,
    label: 'Blood-Request-Relationship-Keys.OTHER'
  }
];
