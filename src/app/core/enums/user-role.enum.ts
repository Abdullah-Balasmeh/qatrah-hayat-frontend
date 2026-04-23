export enum UserRole
{
    Citizen = 1,
    Doctor = 2,
    Employee = 3,
    BranchManager = 4,
    Admin = 5
}
export const USER_ROLE_OPTIONS: Record<UserRole, string> = {
  [UserRole.Citizen]: 'Role-Keys.ROLE_CITIZEN',
  [UserRole.Doctor]: 'Role-Keys.ROLE_DOCTOR',
  [UserRole.Employee]: 'Role-Keys.ROLE_EMPLOYEE',
  [UserRole.BranchManager]: 'Role-Keys.ROLE_BRANCH_MANAGER',
  [UserRole.Admin]: 'Role-Keys.ROLE_ADMIN'
};
