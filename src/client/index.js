/**
 * @flow
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routers from '../universal/routers';
import configureStore from '../universal/store/configureStore';
import immutifyState from '../universal/utils/immutifyState';

import '../universal/stylesheets/main.scss';

const initialState = immutifyState(JSON.parse(window.__INITIAL_STATE__));
const store = configureStore(initialState);
const routes = routers(store);

ReactDom.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
    >
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root'),
);
