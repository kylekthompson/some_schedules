export interface ICreatedUser extends IUser {
  token: string;
}

export interface IUser {
  createdAt: Date;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  updatedAt: Date;
}

export interface IUserForCreation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation?: string;
}
