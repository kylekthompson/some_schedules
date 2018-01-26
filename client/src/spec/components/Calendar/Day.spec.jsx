import React from 'react';

import { mount } from 'enzyme';
import Moment from 'moment';

import Day from 'components/Calendar/Day';
import DayInCurrentMonth from 'components/Calendar/DayInCurrentMonth';
import DayInOtherMonth from 'components/Calendar/DayInOtherMonth';
import Today from 'components/Calendar/Today';

const mountComponent = (props) => {
  const currentMonth = Moment([2018, 11, 25]);
  const day = Moment([2018, 11, 25]);
  const selectedDay = Moment([2018, 11, 25]);
  return mount(
    <Day
      currentMonth={currentMonth}
      day={day}
      selectedDay={selectedDay}
      onClick={() => {}}
      {...props}
    />
  );
};

describe('<Day />', () => {
  describe('when day selected is the same day as the day being rendered', () => {
    it('uses the correct component', () => {
      const day = Moment([2018, 11, 25]);
      const selectedDay = Moment([2018, 11, 25]);
      const wrapper = mountComponent({
        day,
        selectedDay,
      });

      expect(wrapper.find(Today)).toHaveLength(1);
    });
  });

  describe('when day selected is not the same day but the current month is the same month as the day being rendered', () => {
    it('uses the correct component', () => {
      const currentMonth = Moment([2018, 11, 25]);
      const day = Moment([2018, 11, 25]);
      const selectedDay = Moment([2018, 11, 24]);
      const wrapper = mountComponent({
        currentMonth,
        day,
        selectedDay,
      });

      expect(wrapper.find(DayInCurrentMonth)).toHaveLength(1);
    });
  });

  describe('when day selected is not the same day and the current month is not the same month as the day being rendered', () => {
    it('uses the correct component', () => {
      const currentMonth = Moment([2018, 10, 25]);
      const day = Moment([2018, 11, 25]);
      const selectedDay = Moment([2018, 11, 24]);
      const wrapper = mountComponent({
        currentMonth,
        day,
        selectedDay,
      });

      expect(wrapper.find(DayInOtherMonth)).toHaveLength(1);
    });
  });
});
