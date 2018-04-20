import React from 'react';
import { AuthenticationContextValue } from 'spec/factories';
import { Consumer, Provider } from 'components/authentication';
import { render } from 'react-testing-library';

const mount = (overrides = {}) => {
  const { consumer = {}, provider = {} } = overrides;

  return render(
    <Provider value={new AuthenticationContextValue()} {...provider}>
      <Consumer render={() => null} {...consumer} />
    </Provider>,
  );
};

describe('<Consumer />', () => {
  it('renders using the render prop', () => {
    const rendered = <p>Rendered</p>;
    const { getByText } = mount({
      consumer: {
        render: () => rendered,
      },
    });

    expect(getByText('Rendered')).toHaveTextContent('Rendered');
  });

  it('passes the correct props to the render function', () => {
    const render = jest.fn(() => null);

    mount({
      consumer: {
        render,
      },
    });

    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledWith(
      expect.objectContaining({
        isAdmin: expect.any(Boolean),
        isSignedIn: expect.any(Boolean),
        requestSignIn: expect.any(Function),
        requestSignOut: expect.any(Function),
        role: null,
      }),
    );
  });
});
