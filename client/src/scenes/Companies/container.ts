import Companies from './Companies';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUserIdFromToken } from '../../services/store/Authentication/selectors';
import { IApplicationState } from '../../services/store/types';
import { ICompaniesProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<ICompaniesProps> => ({
  userId: getUserIdFromToken(state),
});

export default withRouter(connect(mapStateToProps)(Companies));
