export interface ICreatedUser {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  token: string;
}

export interface IUserForCreation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation?: string;
}
