import React from 'react';

import { mount } from 'enzyme';
import Moment from 'moment';

import Cell from 'components/WeeklySchedule/Cell';
import Row from 'components/WeeklySchedule/Row';
import ShiftComponent from 'components/WeeklySchedule/Shift';
import { constants } from 'models/time';
import { Shift, User } from 'spec/factories';
import { findTestId } from 'spec/utilities';

const mountComponent = (props) => {
  const user = new User();
  const shift = new Shift({ user });
  return mount((
    <Row
      onCellClick={() => () => {}}
      shifts={[shift]}
      sortShifts={(s) => s}
      startOfWeek={Moment.utc([2018, 11, 25]).startOf('week')}
      user={user}
      {...props}
    />
  ));
};

describe('<Row />', () => {
  it('renders the correct number of cells', () => {
    const wrapper = mountComponent();

    expect(wrapper.find(Cell)).toHaveLength(1 + constants.DAYS_IN_WEEK);
  });

  it('renders all of the shifts', () => {
    const user = new User();
    const shifts = [new Shift({ user }), new Shift({ user }), new Shift({ user })];
    const wrapper = mountComponent({
      shifts,
      user,
    });

    expect(wrapper.find(ShiftComponent)).toHaveLength(shifts.length);
  });

  describe('when a cell is clicked', () => {
    it('calls onCellClick()', () => {
      const onCellClick = jest.fn();
      const user = new User();
      const shift = new Shift({ user });
      const wrapper = mountComponent({
        onCellClick: () => onCellClick,
        shifts: [shift],
        user,
      });

      findTestId(wrapper, `user-${user.id}-Sun`).props().onClick();

      expect(onCellClick).toHaveBeenCalledTimes(1);
    });
  });
});
