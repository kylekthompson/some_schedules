import Header from './Header';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestSignOut } from '../../services/store/Authentication/actionCreators';
import { getUserIdFromToken } from '../../services/store/Authentication/selectors';
import { IApplicationState } from '../../services/store/types';
import { requestUserById } from '../../services/store/Users/actionCreators';

const mapStateToProps = (state: IApplicationState) => ({
  isSignedIn: state.authentication.isSignedIn,
  userId: getUserIdFromToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestSignOut, requestUserById }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
