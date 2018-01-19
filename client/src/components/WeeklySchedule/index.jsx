import React, { Component, Fragment } from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import { FlexContainer } from 'components/Flex';
import Header from 'components/WeeklySchedule/Header';
import Row from 'components/WeeklySchedule/Row';
import Scroller from 'components/WeeklySchedule/Scroller';
import { propTypes as shiftPropTypes } from 'models/shift';
import { propTypes as userPropTypes } from 'models/user';
import { propTypes as viewerPropTypes } from 'models/viewer';

const shiftsForUser = (shifts, user) => shifts.filter((shift) => shift.user.id === user.id);
const renderUserRow = (
  user,
  shifts,
  onAddShift,
  startOfWeek,
) => (
  <Row
    key={user.id}
    onAddShift={onAddShift}
    startOfWeek={startOfWeek}
    user={user}
    shifts={shiftsForUser(shifts, user)}
  />
);

export class WeeklySchedule extends Component {
  static propTypes = {
    onAddShift: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(Moment).isRequired,
    viewer: viewerPropTypes.isRequired,
  };

  get sortedUsers() {
    return [...this.props.viewer.company.users].sort((userA, userB) => userA.id - userB.id);
  }

  render() {
    const startOfWeek = this.props.selectedDay.clone().startOf('week');
    return (
      <FlexContainer flexDirection="column" height="100%">
        <Header startOfWeek={startOfWeek} />
        <Scroller>
          {this.sortedUsers.map((user) => renderUserRow(user, this.props.viewer.company.shifts, this.props.onAddShift, startOfWeek))}
        </Scroller>
      </FlexContainer>
    );
  }
}

export default WeeklySchedule;
