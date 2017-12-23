import React from 'react';
import { findDOMNode } from 'react-dom';

import DayPickerWrapper from './components/DayPickerWrapper';
import Picker from './components/Picker';

class DayPicker extends React.Component {
  state = {
    currentMonth: this.props.selectedDay.clone(),
    visible: false,
  };
  dayPicker = null;

  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('touchend', this.handleOutsideClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('touchend', this.handleOutsideClick);
  }

  render() {
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

  onMonthChange = (newMonth) => () => {
    this.setState({
      currentMonth: newMonth,
    });
  }

  handleDayPick = (dayPicked) => () => {
    this.props.onDayPick(dayPicked)();
    this.setState({
      visible: false,
    });
  }

  handleOutsideClick = (event) => {
    const isInsideClick = findDOMNode(this.dayPicker).contains(event.target);
    if (this.state.visible && !isInsideClick) {
      this.setState({
        visible: false,
      });
    }
  }

  toggleVisibility = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  }

  setDayPickerRef = (ref) => {
    this.dayPicker = ref;
  }
}

export default DayPicker;
