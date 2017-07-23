/**
 * @flow
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import github from './github';

const rootReducer = combineReducers({
  routing: routerReducer,
  github,
});

export default rootReducer;
