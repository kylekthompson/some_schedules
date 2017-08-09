import Header from './Header';

import { connect } from 'react-redux';

import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (_dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
