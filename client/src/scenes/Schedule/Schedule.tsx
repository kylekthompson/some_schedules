import * as React from 'react';

import * as moment from 'moment-timezone';

import Loading from '../../components/Loading';
import { createShift } from '../../services/graphql/mutations/createShift';
import WeeklyCalendar from './components/WeeklyCalendar';
import { addShiftToState, getViewer } from './helpers';
import { IScheduleState, ScheduleView } from './types';

class Schedule extends React.Component<{}, IScheduleState> {
  public state: IScheduleState = {
    currentView: ScheduleView.WEEK,
    selectedDay: moment.tz(moment.tz.guess()),
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
      <WeeklyCalendar
        onAddShift={this.handleAddShift}
        onDayPick={this.setSelectedDay}
        selectedDay={selectedDay}
        shifts={viewer.company.shifts}
        users={sortedUsers}
      />
    );
  }

  private setSelectedDay = (day: moment.Moment) => () => {
    this.setState({
      selectedDay: day,
    });
  }

  private handleAddShift = (userId: number, date: moment.Moment) => () => {
    createShift({
      endTime: date.clone().hours(14).startOf('hour').format(),
      startTime: date.clone().hours(12).startOf('hour').format(),
      userId,
    }).then(({ data: { createShift: { shift} } }) => {
      if (shift) {
        this.setState((prevState) => addShiftToState(prevState, shift));
      }
    });
  }
}

export default Schedule;
