export enum CompanyUserRole {
  OWNER,
  MANAGER,
  EMPLOYEE
}

export interface ICompanyUser {
  createdAt: Date;
  id: number;
  companyId: number;
  userId: number;
  role: CompanyUserRole;
  updatedAt: Date;
}
