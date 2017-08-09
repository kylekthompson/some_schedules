export interface ISignInProps {
  error: object;
  isSignedIn: boolean;
  requestSignIn: (email: string, password: string) => void;
}
