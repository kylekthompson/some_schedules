import React from 'react';

import { mount } from 'enzyme';
import Moment from 'moment';

import Header from 'components/WeeklySchedule/Header';
import HeaderDay from 'components/WeeklySchedule/HeaderDay';
import { constants } from 'models/time';

const mountComponent = (props) => mount((
  <Header
    startOfWeek={Moment.utc([2018, 11, 25])}
    {...props}
  />
));

describe('<Header />', () => {
  it('renders the correct days', () => {
    const startOfWeek = Moment.utc([2018, 11, 25]);
    const wrapper = mountComponent({
      startOfWeek,
    });

    expect(wrapper.find(HeaderDay)).toHaveLength(constants.DAYS_IN_WEEK);

    const iteratingDay = startOfWeek.clone().subtract(1, 'day');
    wrapper.find(HeaderDay).forEach((day) => {
      expect(day.props().day).toEqual(iteratingDay.add(1, 'day'));
    });
  });
});
