import {handleActions, createAction} from 'redux-actions';
import {push} from 'react-router-redux';
import ApiClient from '../../helpers/ApiClient';
import {ERROR as GLOBAL_ERROR, loadForumUnreadTotal} from './global';
import {USER_UPDATED} from './shared';

const apiClient = new ApiClient();

const LOGGED_IN = 'auth/LOGGED_IN';
const LOAD = 'auth/LOAD';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const REGISTERED = 'auth/REGISTERED';
const CLEAR_CONFIRM_EMAIL_INFO = 'auth/CLEAR_CONFIRM_EMAIL_INFO';
const IGNORE = 'auth/IGNORE';
const EMAIL_VERIFIED = 'auth/EMAIL_VERIFIED';

export function load() {
  return {
    fatal: true,
    type: LOAD,
    promise: async function ({client, dispatch}) {
      const user = await client.get('/me');
      if (user) {
        await loadForumUnreadTotal(client, dispatch);
      }
      return user;
    }
  };
}

export function verifyEmail(code) {
  return {
    types: [IGNORE, EMAIL_VERIFIED, GLOBAL_ERROR],
    promise: ({client}) => client.post('/verify-email/' + code)
  };
}

export function changeEmail(code) {
  return {
    types: [IGNORE, EMAIL_VERIFIED, GLOBAL_ERROR],
    promise: ({client}) => client.post('/change-email/' + code)
  };
}

export function isLoaded(globalState:Object) {
  return globalState.auth && globalState.auth.loaded;
}

export const loggedIn = createAction(LOGGED_IN);

export const logout = () => async function (dispatch) {
  await apiClient.post('/logout');
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch(push('/home'));
};

export const handleLoginSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.post('/login', { data: { ...values, cookie: true } })
      .then((result) => {
        dispatch(loggedIn(result));
        dispatch(push('/'));
      })
      .catch((result) => {
        reject({ _error: result.error || 'Unexpected error occurred' });
      });
  });
};

export const handleRegisterSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.post('/register', { data: values })
      .then(() => {
        dispatch(push('/home'));
        dispatch({type: REGISTERED, payload: values.email});
        setTimeout(() => dispatch({type: CLEAR_CONFIRM_EMAIL_INFO, payload: values.email}), 4000);
      })
      .catch((result) => {
        if (result.error && result.error.indexOf('Email') !== -1) {
          reject({ email: result.error });
        } else if (result.error && result.error.indexOf('Username') !== -1) {
          reject({ username: result.error });
        } else {
          reject({ _error: result.error || 'Unexpected error occurred' });
        }
      });
  });
};

export default handleActions({
  [LOAD]: (state, {payload: {user}}) => ({...state, user, isLoggedIn: !!user, loaded: true}),
  [LOGGED_IN]: (state, {payload: {user}}) => ({...state, user, isLoggedIn: true}),
  [USER_UPDATED]: (state, {payload: user}) => ({...state, user}),

  // for backend processing only
  // it will read token, set auth cookie and redirect to home
  [EMAIL_VERIFIED]: (state, {payload: {user, token: authToken}}) => ({...state, user, authToken}),
  [LOGOUT_SUCCESS]: (state) => ({...state, user: null, isLoggedIn: false}),
  [REGISTERED]: (state, {payload: confirmEmailTarget}) => ({...state, confirmEmailVisible: true, confirmEmailTarget}),
  [CLEAR_CONFIRM_EMAIL_INFO]: (state) => ({...state, confirmEmailVisible: false, confirmEmailTarget: null})
}, {
  loaded: false,
  user: null,
  isLoggedIn: false,
  confirmEmailVisible: false,
  confirmEmailTarget: null
});
