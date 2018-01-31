import React from 'react';

import { mount } from 'enzyme';

import Loading from 'components/Loading';

const mountComponent = (props) => mount((
  <Loading
    message="message"
    {...props}
  />
));

describe('<Loading />', () => {
  it('renders the loading message', () => {
    const message = 'Loading...';
    const wrapper = mountComponent({
      message,
    });

    expect(wrapper.contains(message)).toEqual(true);
  });
});
