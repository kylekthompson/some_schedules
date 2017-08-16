export interface ICreatedUser extends IUser {
  token: string;
}

export interface IUser {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

export interface IUserForCreation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation?: string;
}
