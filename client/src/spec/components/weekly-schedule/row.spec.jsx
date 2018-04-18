import React from 'react';

import { mount } from 'enzyme';

import Cell from 'components/weekly-schedule/cell';
import Row from 'components/weekly-schedule/row';
import ShiftComponent from 'components/weekly-schedule/shift';
import { constants, startOfWeek } from 'models/time';
import { Shift, User } from 'spec/factories';
import { findTestId } from 'spec/utilities';

const mountComponent = (props) => {
  const user = new User();
  const shift = new Shift({ user });
  return mount(
    <Row
      onCellClick={() => () => {}}
      shifts={[shift]}
      sortShifts={(s) => s}
      startOfWeek={startOfWeek(new Date(Date.UTC(2018, 11, 25)))}
      user={user}
      {...props}
    />,
  );
};

describe('<Row />', () => {
  it('renders the correct number of cells', () => {
    const wrapper = mountComponent();

    expect(wrapper.find(Cell)).toHaveLength(1 + constants.DAYS_IN_WEEK);
  });

  it('renders all of the shifts', () => {
    const user = new User();
    const shifts = [
      new Shift({ user }),
      new Shift({ user }),
      new Shift({ user }),
    ];
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

      findTestId(wrapper, `user-${user.id}-6`)
        .props()
        .onClick();

      expect(onCellClick).toHaveBeenCalledTimes(1);
    });
  });
});
