
const LOGGED_IN = 'auth/LOGGED_IN';
const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';


import {createAction, handleActions} from 'redux-actions';

const initialState = {
  loaded: false,
  user: null,
  isLoggedIn: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        user: action.result.user
      };
    case LOAD_FAIL:
      return {
        ...state,
        loaded: true,
        error: action.error
      };
    case LOGGED_IN:
      return {
        ...state,
        user: action.result.user,
        isLoggedIn: !!action.result.user
      };
    default:
      return state;
  }
}
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/me')
  };
}

export function isLoaded(globalState: Object) {
  return globalState.auth && globalState.auth.loaded;
}

export const loggedIn = createAction(LOGGED_IN);
