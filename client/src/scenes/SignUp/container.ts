import SignUp from './SignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addFlash, clearFlashes } from '../../services/store/Flashes/actionCreators';
import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  companyCreation: state.companies.companyCreation,
  isSignedIn: state.authentication.isSignedIn,
  userCreation: state.users.userCreation,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ addFlash, clearFlashes }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
