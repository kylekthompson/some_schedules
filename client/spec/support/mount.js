import AuthenticationProvider from 'spec/support/mocks/components/authentication/provider';
import React from 'react';
import { AuthenticationContextValue } from 'spec/support/factories';
import { MemoryRouter as Router } from 'react-router-dom';
import { fireEvent, render, wait, waitForElement, within } from 'react-testing-library';

export function mount(tree) {
  return {
    ...render(tree),
    blur: (element) => fireEvent.blur(element),
    click: (element) => fireEvent.click(element),
    enterValue: (element, value) => fireEvent.input(element, {
      target: {
        value,
      },
    }),
    fireEvent,
    focus: (element) => fireEvent.focus(element),
    wait,
    waitForElement,
    within,
  };
}

export function mountAsApp(tree, options = {}) {
  const authenticationContextValue = options.authenticationContextValue || new AuthenticationContextValue().signedIn();
  const route = options.route || '/';

  return mount(
    <AuthenticationProvider value={authenticationContextValue}>
      <Router initialEntries={[route]}>
        {tree}
      </Router>
    </AuthenticationProvider>
  );
}
