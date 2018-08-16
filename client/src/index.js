import EntryPoint from 'src/scenes/entry-point';
import React from 'react';
import { render } from 'react-dom';

const root = document.getElementById('root');

if (process.env.NODE_ENV === 'development') {
  const RedBox = require('redbox-react').default;

  try {
    render(<EntryPoint />, root);
  } catch (error) {
    render(<RedBox error={error} />, root);
  }
} else {
  render(<EntryPoint />, root);
}
