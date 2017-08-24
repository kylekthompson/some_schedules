import MyCompanies from './MyCompanies';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getUserIdFromToken } from '../../../../services/store/Authentication/selectors';
import { requestCompaniesByUserId } from '../../../../services/store/Companies/actionCreators';
import { getCompaniesForSignedInUser } from '../../../../services/store/Companies/selectors';
import { IApplicationState } from '../../../../services/store/types';
import { IMyCompaniesProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<IMyCompaniesProps> => ({
  companies: getCompaniesForSignedInUser(state),
  requestCompaniesByUserIdLoadingState: state.companies.requestCompaniesByUserIdLoadingState,
  userId: getUserIdFromToken(state),
});

const mapDispatchToProps = (dispatch): Partial<IMyCompaniesProps> => ({
  ...bindActionCreators({ requestCompaniesByUserId }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCompanies));
