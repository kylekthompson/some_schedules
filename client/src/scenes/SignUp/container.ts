import SignUp from './SignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestSignUp } from '../../services/store/Authentication/actionCreators';
import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  isSignedIn: state.authentication.isSignedIn,
  signUp: state.authentication.signUp,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestSignUp }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
