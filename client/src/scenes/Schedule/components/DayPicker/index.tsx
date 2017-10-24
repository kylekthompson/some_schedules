import * as React from 'react';

import { Moment } from 'moment-timezone';

import DayPickerWrapper from './components/DayPickerWrapper';
import Picker from './components/Picker';
import { IDayPickerProps, IDayPickerState } from './types';

class DayPicker extends React.Component<IDayPickerProps, IDayPickerState> {
  public constructor(props, context) {
    super(props, context);

    this.state = {
      currentMonth: this.props.selectedDay.clone(),
    };
  }

  public render() {
    const { onClick, onDayPick, selectedDay, visible } = this.props;
    const { currentMonth } = this.state;

    return (
      <DayPickerWrapper>
        <button onClick={onClick}>Calendar</button>
        <Picker
          currentMonth={currentMonth}
          onDayPick={onDayPick}
          onMonthChange={this.onMonthChange}
          selectedDay={selectedDay}
          visible={visible}
        />
      </DayPickerWrapper>
    );
  }

  private onMonthChange = (newMonth: Moment) => () => {
    this.setState({
      currentMonth: newMonth,
    });
  }
}

export default DayPicker;
