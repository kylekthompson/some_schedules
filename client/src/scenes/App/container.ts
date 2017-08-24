import App from './App';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getUserIdFromToken } from '../../services/store/Authentication/selectors';
import { IApplicationState } from '../../services/store/types';
import { requestUserById } from '../../services/store/Users/actionCreators';
import { IAppProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<IAppProps> => ({
  isSignedIn: state.authentication.isSignedIn,
  requestUserByIdLoadingState: state.users.requestUserByIdLoadingState,
  signedInUserId: getUserIdFromToken(state),
});

const mapDispatchToProps = (dispatch): Partial<IAppProps> => ({
  ...bindActionCreators({ requestUserById }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
