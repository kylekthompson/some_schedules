import App from 'scenes/App/App';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
  isSignedIn: state.authentication.isSignedIn,
});

export default withRouter(connect(mapStateToProps)(App));
