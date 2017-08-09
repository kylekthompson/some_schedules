import SignUp from './SignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestSignUp } from '../../services/store/Authentication/actionCreators';
import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  errors: state.authentication.signUp.errors,
  isSignedIn: state.authentication.isSignedIn,
  loading: state.authentication.signUp.loading,
  user: state.authentication.signUp.user,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestSignUp }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
