import Header from './Header';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestSignOut } from '../../services/store/Authentication/actionCreators';

const mapStateToProps = (state) => ({
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestSignOut }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
