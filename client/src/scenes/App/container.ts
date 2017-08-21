import App from './App';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  isSignedIn: state.authentication.isSignedIn,
});

const mapDispatchToProps = (_dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
