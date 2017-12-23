import * as React from 'react';
import { findDOMNode } from 'react-dom';

import { Moment } from 'moment-timezone';

import DayPickerWrapper from './components/DayPickerWrapper';
import Picker from './components/Picker';
import { IDayPickerProps, IDayPickerState } from './types';

class DayPicker extends React.Component<IDayPickerProps, IDayPickerState> {
  public state: IDayPickerState= {
    currentMonth: this.props.selectedDay.clone(),
    visible: false,
  };
  private dayPicker: HTMLElement;

  public componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('touchend', this.handleOutsideClick);
  }

  public componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('touchend', this.handleOutsideClick);
  }

  public render() {
    const { selectedDay } = this.props;
    const { currentMonth, visible } = this.state;

    return (
      <DayPickerWrapper ref={this.setDayPickerRef}>
        <button onClick={this.toggleVisibility}>Calendar</button>
        <Picker
          currentMonth={currentMonth}
          onDayPick={this.handleDayPick}
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

  private handleDayPick = (dayPicked: Moment) => () => {
    this.props.onDayPick(dayPicked)();
    this.setState({
      visible: false,
    });
  }

  private handleOutsideClick = (event: MouseEvent) => {
    const isInsideClick = findDOMNode(this.dayPicker).contains(event.target as Element);
    if (this.state.visible && !isInsideClick) {
      this.setState({
        visible: false,
      });
    }
  }

  private toggleVisibility = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  }

  private setDayPickerRef = (ref) => {
    this.dayPicker = ref;
  }
}

export default DayPicker;
