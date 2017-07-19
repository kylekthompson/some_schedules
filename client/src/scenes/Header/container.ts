import Header from './Header';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestSignOut } from '../../services/store/Authentication/actionCreators';
import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  requestSignOut: bindActionCreators(requestSignOut, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
