import React from 'react';
import { Separator } from 'components/form';
import { mount } from 'spec/support/mount';

describe('<Separator />', () => {
  it('is styled correctly', () => {
    const { container } = mount(<Separator />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
