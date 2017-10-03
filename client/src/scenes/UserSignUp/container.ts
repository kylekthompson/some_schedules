import UserSignUp from './UserSignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { persistSignIn } from '../../services/store/Authentication/actionCreators';
import { IApplicationState } from '../../services/store/types';
import { IUserSignUpProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<IUserSignUpProps> => ({
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (dispatch): Partial<IUserSignUpProps> => ({
  ...bindActionCreators({ persistSignIn }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUp);
