import { RouteComponentProps } from 'react-router-dom';

import { requestUserById } from '../../services/store/Users/actionCreators';

export interface IAppProps extends RouteComponentProps<{}> {
  isSignedIn: boolean;
  requestUserById: typeof requestUserById;
  signedInUserId: number;
}
