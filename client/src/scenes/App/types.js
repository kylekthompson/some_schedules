import { RouteComponentProps } from 'react-router-dom';

export interface IAppProps extends RouteComponentProps<{}> {
  isSignedIn: boolean;
}
