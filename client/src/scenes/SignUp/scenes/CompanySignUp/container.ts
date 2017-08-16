import CompanySignUp from './CompanySignUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestCreation } from '../../../../services/store/Companies/actionCreators';
import { IApplicationState } from '../../../../services/store/types';
import { requestSignUp } from '../../../../services/store/Users/actionCreators';

const mapStateToProps = (state: IApplicationState) => ({
  companyCreation: state.companies.companyCreation,
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestCreation, requestSignUp }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanySignUp);
