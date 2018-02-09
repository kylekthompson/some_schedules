/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import AuthenticationProvider from 'components/AuthenticationProvider';
import { fonts } from 'models/styles';
import EntryPoint from 'scenes/EntryPoint';

import '@fortawesome/fontawesome-pro-webfonts/css/fa-light.css';
import '@fortawesome/fontawesome-pro-webfonts/css/fa-regular.css';
import '@fortawesome/fontawesome-pro-webfonts/css/fontawesome.css';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @font-face {
    font-family: 'Open Sans';
    src: url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  }

  html * {
    ${fonts.regular}
  }

  body {
    margin: 0;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`;


const render = (props) => (
  <BrowserRouter>
    <EntryPoint {...props} />
  </BrowserRouter>
);

ReactDOM.render(
  <AuthenticationProvider render={render} />,
  document.getElementById('root'),
);
