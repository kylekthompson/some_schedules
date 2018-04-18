import React from 'react';

import { mount } from 'enzyme';

import Calendar from 'components/calendar';
import Navigation from 'components/calendar/navigation';

const mountComponent = (props) =>
  mount(
    <Calendar
      selectedDay={new Date(Date.UTC(2018, 11, 25))}
      onDayClick={() => () => {}}
      {...props}
    />,
  );

describe('<Calendar />', () => {
  it('correctly sets the initial state', () => {
    const selectedDay = new Date(Date.UTC(2018, 11, 25));
    const wrapper = mountComponent({
      selectedDay,
    });

    expect(wrapper.state().currentMonth).toEqual(selectedDay);
  });

  describe('when navigating to a different month', () => {
    it('is reflected in state', () => {
      const newMonth = new Date(Date.UTC(2018, 1, 25));
      const wrapper = mountComponent();

      wrapper
        .find(Navigation)
        .props()
        .onMonthChange(newMonth)();

      expect(wrapper.state().currentMonth).toEqual(newMonth);
    });
  });

  describe('componentWillReceiveProps()', () => {
    describe('when the selectedDay changes', () => {
      it('updates the currentMonth', () => {
        let selectedDay = new Date(Date.UTC(2018, 11, 25));
        const wrapper = mountComponent({
          selectedDay,
        });

        expect(wrapper.state().currentMonth).toEqual(selectedDay);

        selectedDay = new Date(Date.UTC(2018, 11, 15));
        wrapper.setProps({
          selectedDay,
        });

        expect(wrapper.state().currentMonth).toEqual(selectedDay);
      });
    });
  });
});
