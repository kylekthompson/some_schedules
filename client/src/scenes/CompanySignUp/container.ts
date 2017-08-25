import CompanySignUp from './CompanySignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestCreation } from '../../services/store/Companies/actionCreators';
import { IApplicationState } from '../../services/store/types';
import { ICompanySignUpProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<ICompanySignUpProps> => ({
  isSignedIn: state.authentication.isSignedIn,
  requestCreationLoadingState: state.companies.requestCreationLoadingState,
});

const mapDispatchToProps = (dispatch): Partial<ICompanySignUpProps> => ({
  ...bindActionCreators({ requestCreation }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanySignUp);
