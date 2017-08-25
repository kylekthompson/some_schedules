import Companies from './Companies';

import { connect } from 'react-redux';

import { IApplicationState } from '../../services/store/types';

const mapStateToProps = (_state: IApplicationState) => ({});

const mapDispatchToProps = (_dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
