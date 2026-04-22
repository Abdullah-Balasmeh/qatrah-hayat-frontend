export enum UserRole
{
    Citizen = 1,
    Doctor = 2,
    Employee = 3,
    BranchManager = 4,
    Admin = 5
}
export const USER_ROLE_OPTIONS=[
  { value: UserRole.Citizen, label: 'Role-Keys.ROLE_CITIZEN' },
  { value: UserRole.Doctor, label: 'Role-Keys.ROLE_DOCTOR' },
  { value: UserRole.Employee, label: 'Role-Keys.ROLE_EMPLOYEE' },
  { value: UserRole.BranchManager, label: 'Role-Keys.ROLE_BRANCH_MANAGER' },
  { value: UserRole.Admin, label: 'Role-Keys.ROLE_ADMIN' }
];
