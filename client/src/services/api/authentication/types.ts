export interface IAuthenticationCredentials {
  email: string;
  password: string;
}

export interface IAuthenticationToken {
  payload: {
    sub: string;
  };
  token: string;
}

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
