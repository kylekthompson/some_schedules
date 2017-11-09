import * as React from 'react';

import * as moment from 'moment-timezone';

import Loading from '../../components/Loading';
import { IShift, IUser } from '../../services/graphql/types';
import ShiftCreationModal from './components/ShiftCreationModal';
import WeeklyCalendar from './components/WeeklyCalendar';
import { addShiftToState, getViewer } from './helpers';
import { IScheduleState, ScheduleView } from './types';

class Schedule extends React.Component<{}, IScheduleState> {
  public state: IScheduleState = {
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

  public componentDidMount() {
    getViewer().then(({ data: { viewer }, errors }) => {
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

  public render() {
    if (this.state.viewer) {
      if (this.state.currentView === ScheduleView.WEEK) {
        return this.renderWeekView();
      }

      // return this.renderDayView();
      return null;
    }

    return <Loading message="Loading..." />;
  }

  private renderWeekView = () => {
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

  private setSelectedDay = (day: moment.Moment) => () => {
    this.setState({
      selectedDay: day,
    });
  }

  private renderShiftCreationModal = (sortedUsers: IUser[]) => {
    if (!this.state.shiftCreationModal.visible) { return null; }
    return (
      <ShiftCreationModal
        day={this.state.shiftCreationModal.day}
        dismissModal={this.dismissModal}
        onAddShift={this.handleAddShift}
        user={sortedUsers.find((user) => user.id === this.state.shiftCreationModal.userId) as IUser}
        x={this.state.shiftCreationModal.x}
        y={this.state.shiftCreationModal.y}
      />
    );
  }

  private toggleShiftCreationModal = (
    userId: number,
    day: moment.Moment
  ) => (event: React.MouseEvent<HTMLDivElement>) => {
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

  private handleAddShift = (shift: IShift) => {
    this.setState((prevState) => addShiftToState(prevState, shift));
  }

  private dismissModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      shiftCreationModal: {
        visible: false,
      },
    }));
  }
}

export default Schedule;
