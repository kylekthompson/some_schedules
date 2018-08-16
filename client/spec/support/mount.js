import { fireEvent, render, wait, waitForElement } from 'react-testing-library';

export default function mount(tree) {
  return {
    ...render(tree),
    wait,
    waitForElement,
    fireEvent,
    blur: (element) => fireEvent.blur(element),
    focus: (element) => fireEvent.focus(element),
    click: (element) => fireEvent.click(element),
    enterValue: (element, value) => fireEvent.input(element, {
      target: {
        value,
      },
    }),
  };
}
