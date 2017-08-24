import { RouteComponentProps } from 'react-router-dom';

import { ILoadingState } from '../../services/store/types';
import { requestUserById } from '../../services/store/Users/actionCreators';

export interface IAppProps extends RouteComponentProps<{}> {
  isSignedIn: boolean;
  requestUserById: typeof requestUserById;
  requestUserByIdLoadingState: ILoadingState;
  signedInUserId: number;
}
