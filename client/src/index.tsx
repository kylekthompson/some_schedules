import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import App from './scenes/App';
import { registerServiceWorker } from './services/serviceWorker';
import configureStore from './services/store/configureStore';

import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  body {
    padding-top: 70px;
    margin-bottom: 60px;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
