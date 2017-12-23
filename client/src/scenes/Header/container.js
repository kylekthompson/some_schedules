import Header from './Header';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestSignOut } from '../../services/store/Authentication/actionCreators';
import { IApplicationState } from '../../services/store/types';
import { IHeaderProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<IHeaderProps> => ({
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (dispatch): Partial<IHeaderProps> => ({
  ...bindActionCreators({ requestSignOut }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
