import React, { Component } from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import Container from 'components/WeeklySchedule/Container';
import Header from 'components/WeeklySchedule/Header';
import Row from 'components/WeeklySchedule/Row';
import Scroller from 'components/WeeklySchedule/Scroller';
import {
  shiftPropTypes,
  shiftsForUserId,
  sortShiftsByTimeIncreasing,
} from 'models/shift';
import {
  sortUsersByLastNameThenFirstNameIncreasing,
  userPropTypes,
} from 'models/user';

export class WeeklySchedule extends Component {
  static propTypes = {
    onCellClick: PropTypes.func.isRequired,
    shifts: PropTypes.arrayOf(shiftPropTypes).isRequired,
    sortShifts: PropTypes.func.isRequired,
    sortUsers: PropTypes.func.isRequired,
    startOfWeek: PropTypes.instanceOf(Moment).isRequired,
    users: PropTypes.arrayOf(userPropTypes).isRequired,
  };

  static defaultProps = {
    onCellClick: () => {},
    sortShifts: sortShiftsByTimeIncreasing,
    sortUsers: sortUsersByLastNameThenFirstNameIncreasing,
  };

  get sortedUsers() {
    return this.props.sortUsers(this.props.users);
  }

  render() {
    return (
      <Container>
        <Header startOfWeek={this.props.startOfWeek} />
        <Scroller>
          {this.renderRows()}
        </Scroller>
      </Container>
    );
  }

  renderRows = () => this.sortedUsers.map((user) => (
    <Row
      key={user.id}
      onCellClick={this.props.onCellClick}
      shifts={shiftsForUserId(this.props.shifts, user.id)}
      sortShifts={this.props.sortShifts}
      startOfWeek={this.props.startOfWeek}
      user={user}
    />
  ))
}

export default WeeklySchedule;
