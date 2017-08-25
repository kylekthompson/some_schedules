import Flashes from './Flashes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearFlash } from '../../services/store/Flashes/actionCreators';
import { IApplicationState } from '../../services/store/types';
import { IFlashesProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<IFlashesProps> => ({
  flashes: state.flashes,
});

const mapDispatchToProps = (dispatch): Partial<IFlashesProps> => ({
  ...bindActionCreators({ clearFlash }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flashes);
