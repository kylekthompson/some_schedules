import Flashes from 'scenes/Flashes/Flashes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearFlash } from 'services/store/Flashes/actionCreators';

const mapStateToProps = (state) => ({
  flashes: state.flashes,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ clearFlash }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flashes);
