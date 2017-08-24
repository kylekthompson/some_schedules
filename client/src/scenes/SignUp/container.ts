import SignUp from './SignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addFlash, clearFlashes } from '../../services/store/Flashes/actionCreators';
import { IApplicationState } from '../../services/store/types';
import { ISignUpProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<ISignUpProps> => ({
  isSignedIn: state.authentication.isSignedIn,
  requestCreationLoadingState: state.companies.requestCreationLoadingState,
  requestSignUpLoadingState: state.users.requestSignUpLoadingState,
});

const mapDispatchToProps = (dispatch): Partial<ISignUpProps> => ({
  ...bindActionCreators({ addFlash, clearFlashes }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
