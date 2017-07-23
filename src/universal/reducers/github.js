import { fromJS, Map, List } from 'immutable';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  REPO_USER_REQUEST,
  REPO_USER_SUCCESS,
  REPO_USER_FAILURE,
} from '../constants/ActionTypes';

const initialState = fromJS({
  users: {},
  usersSearch: {},
  usersRepos: {},
});

export default function github(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return state.merge({
        users: state.get('users').set(action.user, undefined),
      });
    case GET_USER_SUCCESS:
      return state.merge({
        users: state.get('users').set(action.user, new Map(action.data)),
      });
    case GET_USER_FAILURE:
      return state.merge({
        users: state.get('users').set(action.user, new Map({ loading: false })),
      });
    case SEARCH_USER_REQUEST:
      return state.merge({
        usersSearch: state.get('usersSearch').set(action.text, undefined),
      });
    case SEARCH_USER_SUCCESS:
      return state.merge({
        usersSearch: state.get('usersSearch').set(action.text, new Map(action.data)),
      });
    case SEARCH_USER_FAILURE:
      return state.merge({
        usersSearch: state.get('usersSearch').set(action.text, new Map({ loading: false })),
      });
    case REPO_USER_REQUEST:
      return state.merge({
        usersRepos: state.get('usersRepos').set(action.user, undefined),
      });
    case REPO_USER_SUCCESS:
      return state.merge({
        usersRepos: state.get('usersRepos').set(action.user, fromJS({
          repos: action.data,
        })),
      });
    case REPO_USER_FAILURE:
      return state.merge({
        usersRepos: state.get('usersRepos').set(action.user, new Map({ loading: false })),
      });
    default:
      return state;
  }
}
