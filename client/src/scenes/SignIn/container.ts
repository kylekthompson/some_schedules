import SignIn from './SignIn';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestSignIn } from '../../services/store/Authentication/actionCreators';
import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  error: state.authentication.error,
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  requestSignIn: bindActionCreators(requestSignIn, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
