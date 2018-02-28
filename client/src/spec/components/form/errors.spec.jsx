import React from 'react';

import { mount } from 'enzyme';

import Errors from 'components/Form/Errors';

const mountComponent = (props) => mount((
  <Errors
    errors={['error']}
    {...props}
  />
));

describe('<Errors />', () => {
  it('renders the first error of the errors passed in', () => {
    const errors = ['error1', 'error2'];
    const wrapper = mountComponent({
      errors,
    });

    expect(wrapper.contains(errors[0])).toEqual(true);
    expect(wrapper.contains(errors[1])).toEqual(false);
  });
});
