import SignIn from './SignIn';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { persistSignIn } from '../../services/store/Authentication/actionCreators';
import { addFlash } from '../../services/store/Flashes/actionCreators';
import { IApplicationState } from '../../services/store/types';
import { ISignInProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<ISignInProps> => ({
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (dispatch): Partial<ISignInProps> => ({
  ...bindActionCreators({ addFlash, persistSignIn }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
