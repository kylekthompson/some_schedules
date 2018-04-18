import React from 'react';

import { mount } from 'enzyme';

import Navigation from 'components/calendar/navigation';
import NavigationButton from 'components/calendar/navigation-button';
import { addMonths, isEqual, subtractMonths } from 'models/time';

const mountComponent = (props) =>
  mount(
    <Navigation
      currentMonth={new Date(Date.UTC(2018, 11, 25))}
      onMonthChange={() => () => {}}
      {...props}
    />,
  );

describe('<Navigation />', () => {
  const firstCallArguments = (jestFn) => jestFn.mock.calls[0][0];
  const secondCallArguments = (jestFn) => jestFn.mock.calls[1][0];

  it('has navigation buttons', () => {
    const currentMonth = new Date(Date.UTC(2018, 11, 25));
    const navigateLeft = jest.fn();
    const navigateRight = jest.fn();
    const onMonthChange = jest
      .fn()
      .mockReturnValueOnce(navigateLeft)
      .mockReturnValue(navigateRight);

    const wrapper = mountComponent({
      currentMonth,
      onMonthChange,
    });

    wrapper
      .find(NavigationButton)
      .first()
      .simulate('click');
    wrapper
      .find(NavigationButton)
      .last()
      .simulate('click');

    expect(onMonthChange).toHaveBeenCalledTimes(2);
    expect(navigateLeft).toHaveBeenCalledTimes(1);
    expect(navigateRight).toHaveBeenCalledTimes(1);
    expect(
      isEqual(
        firstCallArguments(onMonthChange),
        subtractMonths(currentMonth, 1),
      ),
    ).toEqual(true);
    expect(
      isEqual(secondCallArguments(onMonthChange), addMonths(currentMonth, 1)),
    ).toEqual(true);
  });
});
