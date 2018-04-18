import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Container from 'components/weekly-schedule/container';
import Header from 'components/weekly-schedule/header';
import Row from 'components/weekly-schedule/row';
import Scroller from 'components/weekly-schedule/scroller';
import {
  shiftPropTypes,
  shiftsForUserId,
  sortShiftsByTimeIncreasing,
} from 'models/shift';
import {
  sortUsersByLastNameThenFirstNameIncreasing,
  userPropTypes,
} from 'models/user';

class WeeklySchedule extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    shifts: PropTypes.arrayOf(shiftPropTypes).isRequired,
    sortShifts: PropTypes.func,
    sortUsers: PropTypes.func,
    startOfWeek: PropTypes.instanceOf(Date).isRequired,
    users: PropTypes.arrayOf(userPropTypes).isRequired,
  };

  static defaultProps = {
    sortShifts: sortShiftsByTimeIncreasing,
    sortUsers: sortUsersByLastNameThenFirstNameIncreasing,
  };

  get sortedUsers() {
    return this.props.sortUsers(this.props.users);
  }

  renderRows = () =>
    this.sortedUsers.map((user) => (
      <Row
        key={user.id}
        onCellClick={this.props.onClick}
        shifts={shiftsForUserId(this.props.shifts, user.id)}
        sortShifts={this.props.sortShifts}
        startOfWeek={this.props.startOfWeek}
        user={user}
      />
    ));

  render() {
    return (
      <Container>
        <Header startOfWeek={this.props.startOfWeek} />
        <Scroller>{this.renderRows()}</Scroller>
      </Container>
    );
  }
}

export default WeeklySchedule;
