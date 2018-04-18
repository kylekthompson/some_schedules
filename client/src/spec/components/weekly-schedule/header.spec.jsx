import React from 'react';

import { mount } from 'enzyme';

import Header from 'components/weekly-schedule/header';
import HeaderDay from 'components/weekly-schedule/header-day';
import { addDays, constants } from 'models/time';

const mountComponent = (props) =>
  mount(<Header startOfWeek={new Date(Date.UTC(2018, 11, 25))} {...props} />);

describe('<Header />', () => {
  it('renders the correct days', () => {
    const startOfWeek = new Date(Date.UTC(2018, 11, 25));
    const wrapper = mountComponent({
      startOfWeek,
    });

    expect(wrapper.find(HeaderDay)).toHaveLength(constants.DAYS_IN_WEEK);

    wrapper.find(HeaderDay).forEach((day, index) => {
      expect(day.props().day).toEqual(addDays(startOfWeek, index));
    });
  });
});
