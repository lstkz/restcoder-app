import {handleActions, createAction} from 'redux-actions';
import {push} from 'react-router-redux';
import ApiClient from '../../helpers/ApiClient';
import {ERROR as GLOBAL_ERROR, loadForumUnreadTotal} from './global';
import {USER_UPDATED} from './shared';
let OAuth;

if (__CLIENT__) {
  OAuth = require('oauthio-web').OAuth;
  OAuth.initialize('vvLLoCtb0tn94OMcoAfMVG384gE');
}

const MESSAGE_TIMEOUT = 8000;

const apiClient = new ApiClient();

const LOGGED_IN = 'auth/LOGGED_IN';
const LOAD = 'auth/LOAD';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const SHOW_CONFIRM_EMAIL_INFO = 'auth/SHOW_CONFIRM_EMAIL_INFO';
const CLEAR_CONFIRM_EMAIL_INFO = 'auth/CLEAR_CONFIRM_EMAIL_INFO';
const IGNORE = 'auth/IGNORE';
const EMAIL_VERIFIED = 'auth/EMAIL_VERIFIED';
const INFO_MESSAGE = 'auth/INFO_MESSAGE';
const CLOSE_MODAL = 'auth/CLOSE_MODAL';
const OPEN_MODAL = 'auth/OPEN_MODAL';
const SOCIAL_ERROR = 'auth/SOCIAL_ERROR';
const CLEAR_SOCIAL_ERROR = 'auth/CLEAR_SOCIAL_ERROR';
const SET_OAUTH_DATA = 'auth/SET_OAUTH_DATA';

function _handleError(reject) {
  return (result) => {
    reject({ _error: result.error || 'Unexpected error occurred' });
  };
}

export function load() {
  return {
    fatal: true,
    type: LOAD,
    promise: async function ({client, dispatch}) {
      const result = await client.get('/me');
      if (result.user) {
        await loadForumUnreadTotal(client, dispatch);
      }
      return result;
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
export const closeModal = createAction(CLOSE_MODAL);
export const openModal = createAction(OPEN_MODAL);

export const logout = () => async function (dispatch) {
  await apiClient.post('/logout');
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch(push('/home'));
};


export const socialAuth = (provider) => async function (dispatch) {
  dispatch({type: CLEAR_SOCIAL_ERROR});
  try {
    const data = await OAuth.popup(provider);
    const oauthData = {provider, accessToken: data.access_token};
    const result = await apiClient.post('/login/social', { data: oauthData });
    if (result.user) {
      dispatch(push('/home'));
      dispatch(loggedIn(result));
    } else {
      dispatch({type: SET_OAUTH_DATA, payload: oauthData});
      dispatch({type: OPEN_MODAL, payload: 'username'});
    }
  } catch (e) {
    if (e.message === 'The popup was closed') {
      return;
    }
    dispatch({type: SOCIAL_ERROR, error: e});
  }
};

export const handleLoginSubmit = (values, dispatch) => {
  dispatch({type: CLEAR_SOCIAL_ERROR});
  return new Promise((resolve, reject) => {
    apiClient.post('/login', { data: { ...values, cookie: true } })
      .then((result) => {
        dispatch(push('/home'));
        dispatch(loggedIn(result));
      })
      .catch((result) => {
        if (result.error === 'Invalid username or password') {
          reject({
            _error: result.error,
            username: 'error',
            password: 'error'
          });
        } else {
          reject({
            _error: 'Unexpected error occurred'
          });
        }
      });
  });
};

export const handleRegisterSubmit = (values, dispatch) => {
  dispatch({type: CLEAR_SOCIAL_ERROR});
  return new Promise((resolve, reject) => {
    apiClient.post('/register', { data: values })
      .then((result) => {
        dispatch(loggedIn(result));
        dispatch(push('/tutorial'));
        dispatch({type: SHOW_CONFIRM_EMAIL_INFO, payload: values.email});
        setTimeout(() => dispatch({type: CLEAR_CONFIRM_EMAIL_INFO, payload: values.email}), MESSAGE_TIMEOUT);
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

export const handleUsernameSubmit = (values, dispatch, oauthData) => {
  return new Promise((resolve, reject) => {
    apiClient.post('/login/social', {
      data: { ...oauthData, ...values }
    })
      .then((result) => {
        dispatch(push('/tutorial'));
        dispatch(loggedIn(result));
      })
      .catch((result) => {
        if (result.error && result.error.indexOf('Username') !== -1) {
          reject({ username: result.error });
        } else {
          reject({ _error: result.error || 'Unexpected error occurred' });
        }
      });
  });
};

export const handleResendActivationLinkSubmit = function(values, dispatch) {
  return new Promise((resolve, reject) => {
    apiClient.post('/activation-link', { data: values })
      .then(() => {
        dispatch(push('/home'));
        dispatch({type: SHOW_CONFIRM_EMAIL_INFO, payload: values.email});
        setTimeout(() => dispatch({type: CLEAR_CONFIRM_EMAIL_INFO, payload: values.email}), MESSAGE_TIMEOUT);
      })
      .catch(_handleError(reject));
  });
};

export const handleForgotPasswordSubmit = function(values, dispatch) {
  return new Promise((resolve, reject) => {
    apiClient.post('/forgot-password', { data: values })
      .then(() => {
        dispatch(push('/home'));
        dispatch({type: INFO_MESSAGE, payload: 'Reset password link has been sent. Please check your email.'});
        setTimeout(() => dispatch({type: INFO_MESSAGE, payload: null}), MESSAGE_TIMEOUT);
      })
      .catch(_handleError(reject));
  });
};

export const handleResetPasswordSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.post('/reset-password', { data: values })
      .then((result) => {
        resolve();
        dispatch(loggedIn(result));
        dispatch(push('/'));
      })
      .catch(_handleError(reject));
  });
};

export const handleContactSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.post('/contact', { data: values })
      .then(() => {
        resolve();
        dispatch({type: INFO_MESSAGE, payload: 'Your message has been sent. Thank you for contacting us.'});
        setTimeout(() => dispatch({type: INFO_MESSAGE, payload: null}), MESSAGE_TIMEOUT);
        dispatch(push('/home'));
      })
      .catch(_handleError(reject));
  });
};

export default handleActions({
  'reduxAsyncConnect/END_GLOBAL_LOAD': (state) => ({...state, isModalVisible: false}),
  [LOAD]: (state, {payload: {user}}) => ({...state, user, isLoggedIn: !!user, loaded: true}),
  [LOGGED_IN]: (state, {payload: {user}}) => ({...state, user, isLoggedIn: true}),
  [USER_UPDATED]: (state, {payload: user}) => ({...state, user}),

  // for backend processing only
  // it will read token, set auth cookie and redirect to home
  [EMAIL_VERIFIED]: (state, {payload: {user, token: authToken}}) => ({...state, user, authToken}),
  [LOGOUT_SUCCESS]: (state) => ({...state, user: null, isLoggedIn: false}),
  [SHOW_CONFIRM_EMAIL_INFO]: (state, {payload: confirmEmailTarget}) => ({...state, confirmEmailVisible: true, confirmEmailTarget}),
  [CLEAR_CONFIRM_EMAIL_INFO]: (state) => ({...state, confirmEmailVisible: false, confirmEmailTarget: null}),
  [INFO_MESSAGE]: (state, {payload: infoMessage}) => ({...state, infoMessage}),
  [CLOSE_MODAL]: (state) => ({...state, isModalVisible: false}),
  [OPEN_MODAL]: (state, {payload: modal}) => ({...state, modal, isModalVisible: true, socialError: null}),
  [SOCIAL_ERROR]: (state, {error}) => ({
    ...state,
    modal: state.modal || 'register',
    isModalVisible: true,
    socialError: error.error || error.message || 'An error occurred. Please refresh page.'
  }),
  [CLEAR_SOCIAL_ERROR]: (state, {error}) => ({...state, socialError: null}),
  [SET_OAUTH_DATA]: (state, {payload: oauthData}) => ({...state,oauthData}),
}, {
  loaded: false,
  user: null,
  isLoggedIn: false,
  confirmEmailVisible: false,
  confirmEmailTarget: null,
  infoMessage: null,
  modal: null,
  isModalVisible: false,
  socialError: null,
});
