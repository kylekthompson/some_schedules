import React from 'react';

import { mount } from 'enzyme';
import Moment from 'moment';

import Navigation from 'components/Calendar/Navigation';
import NavigationButton from 'components/Calendar/NavigationButton';

const mountComponent = (props) => mount(
  <Navigation
    currentMonth={Moment([2018, 11, 25])}
    onMonthChange={() => () => {}}
    {...props}
  />
);

describe('<Navigation />', () => {
  const firstCallArguments = (jestFn) => jestFn.mock.calls[0][0];
  const secondCallArguments = (jestFn) => jestFn.mock.calls[1][0];

  it('has navigation buttons', () => {
    const currentMonth = Moment([2018, 11, 25]);
    const navigateLeft = jest.fn();
    const navigateRight = jest.fn();
    const onMonthChange = jest.fn()
      .mockReturnValueOnce(navigateLeft)
      .mockReturnValue(navigateRight);

    const wrapper = mountComponent({
      currentMonth,
      onMonthChange,
    });

    wrapper.find(NavigationButton).first().simulate('click');
    wrapper.find(NavigationButton).last().simulate('click');

    expect(onMonthChange).toHaveBeenCalledTimes(2);
    expect(navigateLeft).toHaveBeenCalledTimes(1);
    expect(navigateRight).toHaveBeenCalledTimes(1);
    expect(firstCallArguments(onMonthChange).isSame(currentMonth.clone().subtract(1, 'month'))).toEqual(true);
    expect(secondCallArguments(onMonthChange).isSame(currentMonth.clone().add(1, 'month'))).toEqual(true);
  });
});
