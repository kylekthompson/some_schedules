import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const configureStore = () => {
  const devToolsExtension =  window.devToolsExtension;

  const store = createStore(
    combineReducers(reducers),
    compose(
      applyMiddleware(thunk),
      devToolsExtension ? devToolsExtension() : (f) => f
    )
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(combineReducers(nextRootReducer));
    });
  }

  return store;
};

export default configureStore;
