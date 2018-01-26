import React from 'react';

import { mount } from 'enzyme';
import Moment from 'moment';

import Day from 'components/Calendar/Day';
import MonthDays from 'components/Calendar/MonthDays';
import Week from 'components/Calendar/Week';
import { DAYS_IN_WEEK, WEEKS_IN_CALENDAR } from 'models/time';

const mountComponent = (props) => mount(
  <MonthDays
    currentMonth={Moment([2018, 11, 25])}
    selectedDay={Moment([2018, 11, 25])}
    onDayClick={() => () => {}}
    {...props}
  />
);

describe('<MonthDays />', () => {
  it('renders the correct number of weeks', () => {
    const wrapper = mountComponent();

    expect(wrapper.find(Week)).toHaveLength(WEEKS_IN_CALENDAR);
  });

  it('renders the correct number of days', () => {
    const wrapper = mountComponent();

    expect(wrapper.find(Day)).toHaveLength(DAYS_IN_WEEK * WEEKS_IN_CALENDAR);
  });

  it('calls onDayClick() when any day is clicked', () => {
    const onClick = jest.fn();
    const wrapper = mountComponent({
      onDayClick: () => onClick,
    });

    wrapper.find(Day).forEach((day) => day.simulate('click'));

    expect(onClick).toHaveBeenCalledTimes(DAYS_IN_WEEK * WEEKS_IN_CALENDAR);
  });
});
