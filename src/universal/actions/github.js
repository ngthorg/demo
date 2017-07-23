import Axios from 'axios';
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
import { API_URL } from '../../config';

export function fetchUser(login) {
  return {
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE],
    promise: Axios.get(`${API_URL}/users/${login}`),
    user: login,
  };
}

export function fetchSearchUser(text) {
  return {
    types: [SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE],
    promise: Axios.get(`${API_URL}/search/users?q=${text}`),
    text,
  };
}

export function fetchRepoUser(login) {
  return {
    types: [REPO_USER_REQUEST, REPO_USER_SUCCESS, REPO_USER_FAILURE],
    promise: Axios.get(`${API_URL}/users/${login}/repos`),
    user: login,
  };
}

export function getUser(login, requiredFields = []) {
  return (dispatch, getState) => {
    const users = getState().github.getIn(['users', login]);

    if (
      (users && requiredFields.every(key => users.has(key))) ||
      (users && users.get('loading') === false)
    ) {
      return null;
    }

    return dispatch(fetchUser(login));
  };
}

export function searchUser(text, requiredFields = []) {
  return (dispatch, getState) => {
    const usersSearch = getState().github.getIn(['usersSearch', text]);

    if (
      (usersSearch && requiredFields.every(key => usersSearch.has(key))) ||
      (usersSearch && usersSearch.get('loading') === false)
    ) {
      return null;
    }

    return dispatch(fetchSearchUser(text));
  };
}


export function repoUser(login, requiredFields = []) {
  return (dispatch, getState) => {
    const usersRepos = getState().github.getIn(['usersRepos', login]);

    if (
      (usersRepos && requiredFields.every(key => usersRepos.has(key))) ||
      (usersRepos && usersRepos.get('loading') === false)
    ) {
      return null;
    }

    return dispatch(fetchRepoUser(login));
  };
}
