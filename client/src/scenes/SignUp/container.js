import SignUp from './SignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { persistSignIn } from '../../services/store/Authentication/actionCreators';
import { IApplicationState } from '../../services/store/types';
import { ISignUpProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<ISignUpProps> => ({
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (dispatch): Partial<ISignUpProps> => ({
  ...bindActionCreators({ persistSignIn }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
