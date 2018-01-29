import React from 'react';

import { mount } from 'enzyme';
import Moment from 'moment-timezone';
import { Link, MemoryRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Schedule from 'scenes/Schedule';
import { Company, User } from 'spec/factories';
import { findTestId, waitUntil } from 'spec/utilities';

const createGetViewer = () => {
  const viewer = new User().withShifts();
  const company = new Company().withUsers();
  company.users.push(viewer);
  viewer.company = company;
  return jest.fn().mockReturnValue(Promise.resolve({ data: viewer }));
};

const mountComponent = (props, initialRoute = '/app') => mount(
  <Schedule
    getViewer={createGetViewer()}
    {...props}
  />
);

describe('<Schedule />', () => {
  describe('changing weeks', () => {
    it('gets the viewer again', () => {
      const getViewer = createGetViewer();
      const wrapper = mountComponent({
        getViewer,
      });
      const selectedDay = wrapper.state().selectedDay;
      const newDay = selectedDay.clone().subtract(1, 'week');

      expect(getViewer).toHaveBeenCalledTimes(1);

      findTestId(wrapper, 'schedule-sidebar').props().onDayClick(newDay)();

      expect(getViewer).toHaveBeenCalledTimes(2);
    });
  });

  describe('when clicking a cell', () => {
    it('opens the shift creation modal', async (done) => {
      const wrapper = mountComponent();

      await waitUntil(() => wrapper.state().viewer.isLoaded);
      wrapper.update();

      const viewer = wrapper.state().viewer.data;
      const event = new Event('click');
      event.clientX = 0;
      event.clientY = 0;

      findTestId(wrapper, 'weekly-schedule').props().onClick(viewer.id, Moment([2018, 11, 25]))(event);
      wrapper.update();

      expect(findTestId(wrapper, 'shift-creation-modal').props().visible).toEqual(true);
      done();
    });
  });
});
