import { ICompanyUser } from '../companyUsers/types';

export interface ICreatedCompany extends ICompany {
  companyUsers: ICompanyUser[];
}

export interface ICompany {
  createdAt: Date;
  id: number;
  name: string;
  slug: string;
  updatedAt: Date;
}

export interface ICompanyForCreation {
  name: string;
  slug: string;
}
