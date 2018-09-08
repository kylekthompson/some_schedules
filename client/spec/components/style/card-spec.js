import React from 'react';
import { Card } from 'components/style';
import { mount } from 'spec/support/mount';

describe('<Card />', () => {
  it('is styled properly', () => {
    const { container } = mount(<Card />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
