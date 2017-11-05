import * as React from 'react';

import * as moment from 'moment-timezone';

import Loading from '../../components/Loading';
import WeeklyCalendar from './components/WeeklyCalendar';
import { getViewer } from './helpers';
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
    const { viewer } = this.state;
    if (!viewer) { return null; }

    return (
      <WeeklyCalendar
        onDayPick={this.setSelectedDay}
        selectedDay={this.state.selectedDay}
        users={viewer.company.users}
      />
    );
  }

  private setSelectedDay = (day: moment.Moment) => () => {
    this.setState({
      selectedDay: day,
    });
  }
}

export default Schedule;
