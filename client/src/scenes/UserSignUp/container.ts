import UserSignUp from './UserSignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IApplicationState } from '../../services/store/types';
import { requestSignUp } from '../../services/store/Users/actionCreators';
import { IUserSignUpProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<IUserSignUpProps> => ({
  isSignedIn: state.authentication.isSignedIn,
  requestSignUpLoadingState: state.users.requestSignUpLoadingState,
});

const mapDispatchToProps = (dispatch): Partial<IUserSignUpProps> => ({
  ...bindActionCreators({ requestSignUp }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUp);
