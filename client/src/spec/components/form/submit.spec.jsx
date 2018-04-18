import React from 'react';

import { mount } from 'enzyme';

import Submit from 'components/form/submit';

const mountComponent = (props) =>
  mount(<Submit onClick={() => {}} {...props} />);

describe('<Submit />', () => {
  it('has a default type of submit', () => {
    const wrapper = mountComponent();

    expect(wrapper.find('button').props().type).toEqual('submit');
  });

  it('blurs when clicked', () => {
    const blur = jest.fn();
    const wrapper = mountComponent();

    wrapper.find('button').simulate('click', {
      target: {
        blur,
      },
    });

    expect(blur).toHaveBeenCalledTimes(1);
  });

  it('calls onClick() when passed', () => {
    const onClick = jest.fn();
    const wrapper = mountComponent({
      onClick,
    });

    wrapper.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
