import SignUp from './SignUp';

import { connect } from 'react-redux';

import { IApplicationState } from '../../services/store/types';
import { ISignUpProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<ISignUpProps> => ({
  isSignedIn: state.authentication.isSignedIn,
});

export default connect(mapStateToProps)(SignUp);
