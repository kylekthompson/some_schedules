import React from 'react';

import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import Picker from 'components/Calendar/Picker';

class Calender extends React.Component {
  static propTypes = {
    onDayPick: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired,
  };

  state = {
    currentMonth: this.props.selectedDay.clone(),
  };

  render() {
    const { selectedDay } = this.props;
    const { currentMonth } = this.state;

    return (
      <Picker
        currentMonth={currentMonth}
        onDayPick={this.props.onDayPick}
        onMonthChange={this.onMonthChange}
        selectedDay={selectedDay}
      />
    );
  }

  onMonthChange = (newMonth) => () => {
    this.setState({
      currentMonth: newMonth,
    });
  }
}

export default Calender;
