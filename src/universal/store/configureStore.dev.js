import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import promiseMiddleware from '../utils/promiseMiddleware';
import Reducers from '../reducers';


export default function configureStore(initialState = {}) {
  const finalCreateStore = compose(
    applyMiddleware(promiseMiddleware, routerMiddleware(browserHistory), createLogger({
      // development using redux-logger with Immutable
      stateTransformer: state => fromJS(state).toJS(),
    })))(
      /**
      * using redux-devtools-extension
      * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
      */
      window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore,
    );
  const store = finalCreateStore(Reducers, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  syncHistoryWithStore(browserHistory, store);

  return store;
}
