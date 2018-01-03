import React from 'react';

import moment from 'moment-timezone';

import Loading from '../../components/Loading';

import ShiftCreationModal from './components/ShiftCreationModal';
import WeeklyCalendar from './components/WeeklyCalendar';
import { addShiftToState, getViewer, ScheduleView } from './helpers';

class Schedule extends React.Component {
  state = {
    currentView: ScheduleView.WEEK,
    selectedDay: moment.tz(moment.tz.guess()),
    shiftCreationModal: {
      day: moment.tz(moment.tz.guess()),
      userId: 0,
      visible: false,
      x: 0,
      y: 0,
    },
    viewer: undefined,
  };

  componentDidMount() {
    this.loadViewer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedDay === prevState.selectedDay) { return; }

    this.loadViewer();
  }

  render() {
    if (this.state.viewer) {
      if (this.state.currentView === ScheduleView.WEEK) {
        return this.renderWeekView();
      }

      // return this.renderDayView();
      return null;
    }

    return <Loading message="Loading..." />;
  }

  renderWeekView = () => {
    const { selectedDay, viewer } = this.state;
    if (!viewer) { return null; }

    const sortedUsers = [...viewer.company.users].sort((userA, userB) => userA.id - userB.id);
    return (
      <div>
        <WeeklyCalendar
          onAddShift={this.toggleShiftCreationModal}
          onDayPick={this.setSelectedDay}
          selectedDay={selectedDay}
          shifts={viewer.company.shifts}
          users={sortedUsers}
        />
        {this.renderShiftCreationModal(sortedUsers)}
      </div>
    );
  }

  setSelectedDay = (day) => () => {
    this.setState({
      selectedDay: day,
    });
  }

  renderShiftCreationModal = (sortedUsers) => {
    if (!this.state.shiftCreationModal.visible) { return null; }
    return (
      <ShiftCreationModal
        day={this.state.shiftCreationModal.day}
        dismissModal={this.dismissModal}
        onAddShift={this.handleAddShift}
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

  handleAddShift = (shift) => {
    this.setState((prevState) => addShiftToState(prevState, shift));
  }

  dismissModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      shiftCreationModal: {
        visible: false,
      },
    }));
  }

  loadViewer = () => {
    let after = null;
    let before = null;

    if (this.state.currentView === ScheduleView.WEEK) {
      after = this.state.selectedDay.clone().startOf('week').format();
      before = this.state.selectedDay.clone().endOf('week').format();
    } else {
      after = this.state.selectedDay.clone().startOf('day').format();
      before = this.state.selectedDay.clone().endOf('day').format();
    }

    getViewer(after, before).then(({ data: { viewer }, errors }) => {
      if (viewer) {
        this.setState({
          viewer,
        });
      } else if (errors) {
        throw new Error(errors.join('\n'));
      }
    }).catch((_error) => {
      // TODO: handle error
    });
  }
}

export default Schedule;
