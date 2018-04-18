import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import { Provider as AuthenticationProvider } from 'components/authentication';
import { fonts } from 'models/styles';
import EntryPoint from 'scenes/entry-point';

import '@fortawesome/fontawesome-pro-webfonts/css/fa-light.css';
import '@fortawesome/fontawesome-pro-webfonts/css/fa-regular.css';
import '@fortawesome/fontawesome-pro-webfonts/css/fontawesome.css';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');

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

ReactDOM.render(
  <AuthenticationProvider>
    <BrowserRouter>
      <EntryPoint />
    </BrowserRouter>
  </AuthenticationProvider>,
  document.getElementById('root'),
);
