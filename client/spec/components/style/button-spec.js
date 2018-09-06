import React from 'react';
import { Button } from 'components/style';
import { mount } from 'spec/support/mount';

describe('<Button />', () => {
  it('is styled properly', () => {
    const { container } = mount(<Button />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
