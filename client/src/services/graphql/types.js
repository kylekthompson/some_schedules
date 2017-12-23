export interface ICompany {
  createdAt: string;
  id: number;
  name: string;
  slug: string;
  updatedAt: string;
  shifts: IShift[];
  users: IUser[];
}

export type IUserRole = 'OWNER' | 'MANAGER' | 'EMPLOYEE';

export interface IErrors {
  [key: string]: string[];
}

export interface IShift {
  createdAt: string;
  endTime: string;
  id: number;
  published: boolean;
  startTime: string;
  updatedAt: string;
  user: IUser;
}

export interface IUser {
  company: ICompany;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: IUserRole;
  shifts: IShift[];
  updatedAt: string;
}
