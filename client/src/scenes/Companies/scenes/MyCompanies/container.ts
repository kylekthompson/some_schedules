import MyCompanies from './MyCompanies';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../../../../services/store/types';

const mapStateToProps = (_state: IApplicationState) => ({});

const mapDispatchToProps = (_dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCompanies));
