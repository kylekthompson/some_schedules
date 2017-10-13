import Schedule from './Schedule';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUserIdFromToken } from '../../services/store/Authentication/selectors';
import { IApplicationState } from '../../services/store/types';
import { IScheduleProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<IScheduleProps> => ({
  userId: getUserIdFromToken(state),
});

export default withRouter(connect(mapStateToProps)(Schedule));
