import * as React from 'react';

import * as moment from 'moment-timezone';

import Loading from '../../components/Loading';
import WeeklyCalendar from './components/WeeklyCalendar';
import { getUser } from './helpers';
import { IScheduleProps, IScheduleState, ScheduleView } from './types';

class Schedule extends React.PureComponent<IScheduleProps, IScheduleState> {
  public state: IScheduleState = {
    currentView: ScheduleView.WEEK,
    user: undefined,
  };

  public componentDidMount() {
    getUser(this.props.userId).then(({ data: { user }, errors }) => {
      if (user) {
        this.setState({
          user,
        });
      } else if (errors) {
        throw new Error(errors.join('\n'));
      }
    }).catch((_error) => {
      // TODO: handle error
    });
  }

  public render() {
    if (this.state.user) {
      if (this.state.currentView === ScheduleView.WEEK) {
        return this.renderWeekView();
      }

      // return this.renderDayView();
      return null;
    }

    return <Loading message="Loading..." />;
  }

  private renderWeekView = () => {
    const { user } = this.state;
    if (!user) { return null; }

    return (
      <WeeklyCalendar
        startOfWeek={moment.tz(moment.tz.guess()).startOf('week')}
        users={user.company.users.edges.map((edge) => edge.node)}
      />
    );
  }
}

export default Schedule;
