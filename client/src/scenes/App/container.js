import App from './App';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../../services/store/types';
import { IAppProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<IAppProps> => ({
  isSignedIn: state.authentication.isSignedIn,
});

export default withRouter(connect(mapStateToProps)(App));
