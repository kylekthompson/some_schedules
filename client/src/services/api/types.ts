export interface IAPIResponse<T> {
  errors?: IErrors;
  status: number;
  value?: T;
}

export interface ICreatedUser {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  token: string;
}

export interface IErrors {
  [key: string]: string[];
}

export interface IUserForCreation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation?: string;
}
