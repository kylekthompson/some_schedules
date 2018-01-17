import React, { Component, Fragment } from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import { propTypes as viewerPropTypes } from 'models/viewer';

import WeeklyCalendar from './components/WeeklyCalendar';

export class Schedule extends Component {
  static propTypes = {
    onAddShift: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(Moment).isRequired,
    viewer: viewerPropTypes.isRequired,
  };

  render() {
    const { selectedDay, viewer } = this.props;
    const sortedUsers = [...viewer.company.users].sort((userA, userB) => userA.id - userB.id);

    return (
      <Fragment>
        <WeeklyCalendar
          onAddShift={this.props.onAddShift}
          selectedDay={selectedDay}
          shifts={viewer.company.shifts}
          users={sortedUsers}
        />
      </Fragment>
    );
  }
}

export default Schedule;
