import SignIn from './SignIn';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestSignIn } from '../../services/store/Authentication/actionCreators';
import { IApplicationState } from '../../services/store/types';
import { ISignInProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<ISignInProps> => ({
  isSignedIn: state.authentication.isSignedIn,
  requestSignInLoadingState: state.authentication.requestSignInLoadingState,
});

const mapDispatchToProps = (dispatch): Partial<ISignInProps> => ({
  ...bindActionCreators({ requestSignIn }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
