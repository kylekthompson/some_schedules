import Flashes from './Flashes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearFlash } from '../../services/store/Flashes/actionCreators';
import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (state: IApplicationState) => ({
  flashes: state.flashes,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ clearFlash }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flashes);
