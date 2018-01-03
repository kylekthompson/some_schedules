import SignIn from './SignIn';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { persistSignIn } from '../../services/store/Authentication/actionCreators';

const mapStateToProps = (state) => ({
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ persistSignIn }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
