import * as React from 'react';

import * as moment from 'moment';

import Loading from '../../components/Loading';
import WeeklyCalendar from './components/WeeklyCalendar';
import { getUser } from './helpers';
import { IScheduleProps, IScheduleState, ScheduleView } from './types';

class Schedule extends React.PureComponent<IScheduleProps, IScheduleState> {
  public state: IScheduleState = {
    currentView: ScheduleView.WEEK,
    user: undefined,
  };
  private initialWeekNumber: number = moment().week();

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
        initialWeekNumber={this.initialWeekNumber}
        onWeekChange={this.onWeekChange}
        users={user.company.users.edges.map((edge) => edge.node)}
      />
    );
  }

  private onWeekChange = (_newWeekNumber: number) => null;
}

export default Schedule;
