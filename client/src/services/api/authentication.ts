import { IAuthentication } from './types';

const authenticate = (email: string, password: string): IAuthentication => ({
  token: `${email}:${password}`,
});

export const postSignIn = (email: string, password: string): Promise<IAuthentication> => (
  new Promise<IAuthentication>((resolve) => (setTimeout(() => resolve(authenticate(email, password)), 500)))
);
