import { fireEvent, render, wait, waitForElement, within } from 'react-testing-library';

export default function mount(tree) {
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
