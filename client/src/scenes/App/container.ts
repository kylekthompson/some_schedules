import App from './App';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getUserIdFromToken } from '../../services/store/Authentication/selectors';
import { IApplicationState } from '../../services/store/types';
import { requestUserById } from '../../services/store/Users/actionCreators';

const mapStateToProps = (state: IApplicationState) => ({
  isSignedIn: state.authentication.isSignedIn,
  signedInUserId: getUserIdFromToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestUserById }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
