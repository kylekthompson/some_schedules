import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import { fonts } from 'models/styles';
import Landing from 'scenes/Landing';
import { registerServiceWorker } from 'services/serviceWorker';
import configureStore from 'services/store/configureStore';

import '@fortawesome/fontawesome-pro-webfonts/css/fa-light.css';
import '@fortawesome/fontawesome-pro-webfonts/css/fa-regular.css';
import '@fortawesome/fontawesome-pro-webfonts/css/fontawesome.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();

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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
