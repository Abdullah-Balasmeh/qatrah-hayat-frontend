export enum UserRole
{
    Citizen = 1,
    Doctor = 2,
    Employee = 3,
    BranchManager = 4,
    Admin = 5
}
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.Citizen]: 'Citizen',
  [UserRole.Doctor]: 'Doctor',
  [UserRole.Employee]: 'Employee',
  [UserRole.BranchManager]: 'Branch Manager',
  [UserRole.Admin]: 'Admin'
};
