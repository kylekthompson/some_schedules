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
