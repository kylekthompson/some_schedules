import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { fireEvent, render, wait, waitForElement, within } from 'react-testing-library';

export function mount(tree, options = {}) {
  return {
    ...render(tree, options),
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

export function mountWithRouter(tree, route = '/', options = {}) {
  return mount(
    <Router initialEntries={[route]}>
      {tree}
    </Router>,
    options,
  );
}
