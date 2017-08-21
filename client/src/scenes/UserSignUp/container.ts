import UserSignUp from './UserSignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IApplicationState } from '../../services/store/types';
import { requestSignUp } from '../../services/store/Users/actionCreators';

const mapStateToProps = (state: IApplicationState) => ({
  isSignedIn: state.authentication.isSignedIn,
  userCreation: state.users.userCreation,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestSignUp }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUp);
