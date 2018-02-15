import React from 'react';

import { mount } from 'enzyme';

import HeaderDay from 'components/Calendar/HeaderDay';
import MonthHeader from 'components/Calendar/MonthHeader';
import Week from 'components/Calendar/Week';
import { constants } from 'models/time';

const mountComponent = (props) => mount((
  <MonthHeader
    currentMonth={new Date(Date.UTC(2018, 11, 25))}
    selectedDay={new Date(Date.UTC(2018, 11, 25))}
    onDayClick={() => () => {}}
    {...props}
  />
));

describe('<MonthHeader />', () => {
  it('renders the correct number of weeks', () => {
    const wrapper = mountComponent();

    expect(wrapper.find(Week)).toHaveLength(1);
  });

  it('renders the correct number of days', () => {
    const wrapper = mountComponent();

    expect(wrapper.find(HeaderDay)).toHaveLength(constants.DAYS_IN_WEEK);
  });
});
