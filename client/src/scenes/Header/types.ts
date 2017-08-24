import { requestSignOut } from '../../services/store/Authentication/actionCreators';

export interface IHeaderProps {
  isSignedIn: boolean;
  requestSignOut: typeof requestSignOut;
}
