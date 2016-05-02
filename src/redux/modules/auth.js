
import {createAction, handleActions} from 'redux-actions';
import {push} from 'react-router-redux';
import ApiClient from '../../helpers/ApiClient';
const apiClient = new ApiClient();

const LOGGED_IN = 'auth/LOGGED_IN';
const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';


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
        user: action.result.user,
        isLoggedIn: !!action.result.user
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
        user: action.payload.user,
        isLoggedIn: !!action.payload.user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoggedIn: false
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

export const logout = () => async function (dispatch) {
  await apiClient.post('/logout');
  console.log('logout');
  dispatch({type: LOGOUT_SUCCESS});
  dispatch(push('/home'));
};

export const handleLoginSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.post('/login', {data: {...values, cookie: true}})
      .then((result) => {
        dispatch(loggedIn(result));
        dispatch(push('/'));
      })
      .catch((result) => {
        reject({_error: result.error || 'Unexpected error occurred'});
      });
  });
};
