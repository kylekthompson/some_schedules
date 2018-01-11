import React, { Component, Fragment } from 'react';

import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import { viewerPropTypes } from 'models/propTypes';

import ShiftCreationModal from './components/ShiftCreationModal';
import WeeklyCalendar from './components/WeeklyCalendar';

class Schedule extends Component {
  static propTypes = {
    onAddShift: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired,
    viewer: viewerPropTypes.isRequired,
  };

  state = {
    shiftCreationModal: {
      day: moment.tz(moment.tz.guess()),
      userId: 0,
      visible: false,
      x: 0,
      y: 0,
    },
  };

  render() {
    const { selectedDay, viewer } = this.props;
    const sortedUsers = [...viewer.company.users].sort((userA, userB) => userA.id - userB.id);

    return (
      <Fragment>
        <WeeklyCalendar
          onAddShift={this.toggleShiftCreationModal}
          selectedDay={selectedDay}
          shifts={viewer.company.shifts}
          users={sortedUsers}
        />
        {this.renderShiftCreationModal(sortedUsers)}
      </Fragment>
    );
  }

  renderShiftCreationModal = (sortedUsers) => {
    if (!this.state.shiftCreationModal.visible) { return null; }

    return (
      <ShiftCreationModal
        day={this.state.shiftCreationModal.day}
        dismissModal={this.dismissModal}
        onAddShift={this.props.onAddShift}
        user={sortedUsers.find((user) => user.id === this.state.shiftCreationModal.userId)}
        x={this.state.shiftCreationModal.x}
        y={this.state.shiftCreationModal.y}
      />
    );
  }

  toggleShiftCreationModal = (userId, day) => (event) => {
    event.stopPropagation();
    this.setState({
      shiftCreationModal: {
        day,
        userId,
        visible: true,
        x: event.clientX,
        y: event.clientY,
      },
    });
  }

  dismissModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      shiftCreationModal: {
        visible: false,
      },
    }));
  }
}

export default Schedule;
