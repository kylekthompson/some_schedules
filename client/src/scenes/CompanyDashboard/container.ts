import CompanyDashboard from './CompanyDashboard';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUserIdFromToken } from '../../services/store/Authentication/selectors';
import { IApplicationState } from '../../services/store/types';
import { ICompanyDashboardProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<ICompanyDashboardProps> => ({
  userId: getUserIdFromToken(state),
});

export default withRouter(connect(mapStateToProps)(CompanyDashboard));
