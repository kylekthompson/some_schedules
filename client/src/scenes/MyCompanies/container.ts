import MyCompanies from './MyCompanies';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getUserIdFromToken } from '../../services/store/Authentication/selectors';
import { addFlash } from '../../services/store/Flashes/actionCreators';
import { IApplicationState } from '../../services/store/types';
import { IMyCompaniesProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<IMyCompaniesProps> => ({
  userId: getUserIdFromToken(state),
});

const mapDispatchToProps = (dispatch): Partial<IMyCompaniesProps> => ({
  ...bindActionCreators({ addFlash }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCompanies));
