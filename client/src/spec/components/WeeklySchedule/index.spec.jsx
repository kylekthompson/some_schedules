import React from 'react';

import { mount } from 'enzyme';

import WeeklySchedule from 'components/WeeklySchedule';
import Row from 'components/WeeklySchedule/Row';
import { startOfWeek } from 'models/time';
import { Shift, User } from 'spec/factories';

const mountComponent = (props) => {
  const user = new User();
  const shift = new Shift({ user });
  return mount((
    <WeeklySchedule
      onClick={() => () => {}}
      shifts={[shift]}
      startOfWeek={startOfWeek(new Date(Date.UTC(2018, 11, 25)))}
      users={[user]}
      {...props}
    />
  ));
};

describe('<WeeklySchedule />', () => {
  it('renders all of the users', () => {
    const users = [new User(), new User(), new User()];
    const shifts = [new Shift({ user: users[0] })];
    const wrapper = mountComponent({
      shifts,
      sortUsers: (u) => u,
      users,
    });

    expect(wrapper.find(Row)).toHaveLength(users.length);
    wrapper.find(Row).forEach((row, index) => {
      expect(row.props().user).toEqual(users[index]);
    });
  });

  it('puts the correct shifts in the correct rows', () => {
    const users = [new User(), new User(), new User()];
    const shifts = [new Shift({ user: users[0] })];
    const wrapper = mountComponent({
      shifts,
      sortUsers: (u) => u,
      users,
    });

    const rowWithShifts = wrapper.find(Row).findWhere((row) => row.props().user === users[0]);

    expect(rowWithShifts.props().shifts).toEqual(shifts);
    wrapper.find(Row).filterWhere((row) => row.props().user !== users[0]).forEach((row) => {
      expect(row.props().shifts).toEqual([]);
    });
  });
});
