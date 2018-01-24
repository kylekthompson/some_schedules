import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import AuthenticationProvider from 'components/AuthenticationProvider';
import { fonts } from 'models/styles';
import Landing from 'scenes/Landing';
import { registerServiceWorker } from 'services/serviceWorker';

import '@fortawesome/fontawesome-pro-webfonts/css/fa-light.css';
import '@fortawesome/fontawesome-pro-webfonts/css/fa-regular.css';
import '@fortawesome/fontawesome-pro-webfonts/css/fontawesome.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';

injectGlobal`
  @font-face {
    font-family: 'Open Sans';
    src: url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  }

  html * {
    ${fonts.regular}
  }

  p {
    margin: 0;
  }
`;


const render = (props) => (
  <BrowserRouter>
    <Landing {...props} />
  </BrowserRouter>
);

ReactDOM.render(
  <AuthenticationProvider render={render} />,
  document.getElementById('root')
);
registerServiceWorker();
