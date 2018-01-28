import React from 'react';

import { mount } from 'enzyme';
import Moment from 'moment';

import Calendar from 'components/Calendar';
import Navigation from 'components/Calendar/Navigation';

const mountComponent = (props) => mount(
  <Calendar
    selectedDay={Moment.utc([2018, 11, 25])}
    onDayClick={() => () => {}}
    {...props}
  />
);

describe('<Calendar />', () => {
  it('correctly sets the initial state', () => {
    const selectedDay = Moment.utc([2018, 11, 25]);
    const wrapper = mountComponent({
      selectedDay,
    });

    expect(wrapper.state().currentMonth.isSame(selectedDay)).toEqual(true);
  });

  describe('when navigating to a different month', () => {
    it('is reflected in state', () => {
      const newMonth = Moment.utc([2018, 1, 25]);
      const wrapper = mountComponent();

      wrapper.find(Navigation).props().onMonthChange(newMonth)();

      expect(wrapper.state().currentMonth.isSame(newMonth)).toEqual(true);
    });
  });

  describe('componentWillReceiveProps()', () => {
    describe('when the selectedDay changes', () => {
      it('updates the currentMonth', () => {
        let selectedDay = Moment.utc([2018, 11, 25]);
        const wrapper = mountComponent({
          selectedDay,
        });

        expect(wrapper.state().currentMonth.isSame(selectedDay)).toEqual(true);

        selectedDay = Moment.utc([2018, 11, 15]);
        wrapper.setProps({
          selectedDay
        });

        expect(wrapper.state().currentMonth.isSame(selectedDay)).toEqual(true);
      });
    });
  });
});
