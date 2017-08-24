import CompanySignUp from './CompanySignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestCreation } from '../../services/store/Companies/actionCreators';
import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  isSignedIn: state.authentication.isSignedIn,
  requestCreationLoadingState: state.companies.requestCreationLoadingState,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestCreation }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanySignUp);
