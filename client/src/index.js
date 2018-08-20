import EntryPoint from 'src/components/entry-point';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';

const root = document.getElementById('root');
const tree = (
  <Router>
    <EntryPoint />
  </Router>
);

if (process.env.NODE_ENV === 'development') {
  const RedBox = require('redbox-react').default;

  try {
    render(tree, root);
  } catch (error) {
    render(<RedBox error={error} />, root);
  }
} else {
  render(tree, root);
}
