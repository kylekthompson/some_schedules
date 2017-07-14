import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  GenericStoreEnhancer,
  Store
} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const configureStore = () => {
  const devToolsExtension =  (window as any).devToolsExtension as () => GenericStoreEnhancer;

  const store = createStore(
    combineReducers<object>(reducers),
    compose(
      applyMiddleware(thunk),
      devToolsExtension ? devToolsExtension() : (f) => f
    )
  ) as Store<object>;

  if ((module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(combineReducers(nextRootReducer));
    });
  }

  return store;
};

export default configureStore;
