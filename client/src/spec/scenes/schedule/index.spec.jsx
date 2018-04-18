import React from 'react';

import { mount } from 'enzyme';

import { current, subtractWeeks } from 'models/time';
import Schedule from 'scenes/schedule';
import { AuthenticationContextValue, User, Shift } from 'spec/factories';
import { Provider } from 'spec/mocks/components/authentication';
import { findTestId, waitUntil } from 'spec/utilities';

const createGetSchedulesContext = (overrides = {}) => {
  const shift = overrides.shift || new Shift();
  const user = overrides.user || new User();
  shift.user = user;

  return jest.fn().mockReturnValue(
    Promise.resolve({
      context: {
        shifts: [shift],
        users: [user],
      },
    }),
  );
};

const mountComponent = (props = {}) =>
  mount(
    <Provider value={new AuthenticationContextValue(props.value)}>
      <Schedule
        getSchedulesContext={createGetSchedulesContext()}
        setHeaderLinks={() => {}}
        {...props}
      />
    </Provider>,
  );

describe('<Schedule />', () => {
  describe('changing weeks', () => {
    it('gets the context again', () => {
      const getSchedulesContext = createGetSchedulesContext();
      const wrapper = mountComponent({
        getSchedulesContext,
      });
      const newDay = subtractWeeks(current(), 1);

      expect(getSchedulesContext).toHaveBeenCalledTimes(1);

      findTestId(wrapper, 'schedule-sidebar')
        .props()
        .onDayClick(newDay)();

      expect(getSchedulesContext).toHaveBeenCalledTimes(2);
    });
  });

  describe('when clicking a cell', () => {
    it('opens the shift creation modal', async (done) => {
      const user = new User();
      const getSchedulesContext = createGetSchedulesContext({ user });
      const wrapper = mountComponent({
        getSchedulesContext,
      });

      await waitUntil(() => {
        wrapper.update();
        return findTestId(wrapper, 'shift-creation-modal').length === 1;
      });

      const event = new Event('click');
      event.clientX = 0;
      event.clientY = 0;

      findTestId(wrapper, 'weekly-schedule')
        .props()
        .onClick(user.id, new Date(Date.UTC(2018, 11, 25)))(event);
      wrapper.update();

      expect(
        findTestId(wrapper, 'shift-creation-modal').props().visible,
      ).toEqual(true);
      done();
    });
  });
});
