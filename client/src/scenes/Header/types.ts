import { requestSignOut } from '../../services/store/Authentication/actionCreators';
import { requestUserById } from '../../services/store/Users/actionCreators';

export interface IHeaderProps {
  isSignedIn: boolean;
  requestSignOut: typeof requestSignOut;
  requestUserById: typeof requestUserById;
  userId?: number;
}
