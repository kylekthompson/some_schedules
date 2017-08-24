import SignIn from './SignIn';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestSignIn } from '../../services/store/Authentication/actionCreators';
import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  isSignedIn: state.authentication.isSignedIn,
  requestSignInLoadingState: state.authentication.requestSignInLoadingState,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestSignIn }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
