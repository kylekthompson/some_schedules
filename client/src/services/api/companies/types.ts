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
