import MyCompanies from './MyCompanies';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { requestCompaniesByUserId } from '../../../../services/store/Companies/actionCreators';
import { getCompaniesForSignedInUser } from '../../../../services/store/Companies/selectors';
import { IApplicationState } from '../../../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  companies: getCompaniesForSignedInUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestCompaniesByUserId }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCompanies));
