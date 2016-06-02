import {handleActions} from 'redux-actions';
import {initialize, reset as resetForm} from 'redux-form';
import ApiClient from '../../helpers/ApiClient';
import {USER_UPDATED} from './shared';
import {ERROR} from './global';
const apiClient = new ApiClient();

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DATA = 'editProfile::LOAD_DATA';
export const IGNORE = 'editProfile::IGNORE';
export const PASSWORD_CHANGED = 'editProfile::PASSWORD_CHANGED';


// ------------------------------------
// Actions
// ------------------------------------


function _handleError(reject) {
  return (result) => {
    reject({ _error: result.error || 'Unexpected error occurred' });
  };
}

export const loadData = () => (dispatch, getState) => {
  dispatch({type: LOAD_DATA, payload: getState().auth.user});
};


export function updatePicture(file) {
  const formData = new FormData();
  formData.append('picture', file);
  return {
    loader: true,
    types: [IGNORE, USER_UPDATED, ERROR],
    promise: async ({client}) => client.put('/user/me/picture', {data: formData})
  };
}

export function removePicture() {
  return {
    loader: true,
    types: [IGNORE, USER_UPDATED, ERROR],
    promise: async ({client}) => client.del('/user/me/picture')
  };
}

export const handleInfoSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.put('/user/me', { data: values })
      .then((user) => {
        dispatch({type: USER_UPDATED, payload: user});
        resolve();
      })
      .catch(_handleError(reject));
  });
};


export const handleEmailChangeSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.put('/user/me/email', { data: values })
      .then((user) => {
        dispatch({type: USER_UPDATED, payload: user});
        resolve();
        dispatch(initialize('changeEmail', {email: values.email}, ['email']));
        dispatch(resetForm('changeEmail'));
      })
      .catch(_handleError(reject));
  });
};

export const handlePasswordChangeSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.put('/user/me/password', { data: values })
      .then(() => {
        dispatch({ type: PASSWORD_CHANGED, payload: true });
        setTimeout(() => dispatch({ type: PASSWORD_CHANGED, payload: false }), 3000);
        resolve();
        dispatch(resetForm('changePassword'));
      })
      .catch(_handleError(reject));
  });
};

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [LOAD_DATA]: (state, { payload: user }) => ({ ...state, user, isPasswordChanged: false }),
  [USER_UPDATED]: (state, { payload: user }) => ({ ...state, user }),
  [PASSWORD_CHANGED]: (state, { payload: isPasswordChanged }) => ({ ...state, isPasswordChanged }),
}, {
  user: {},
  isPasswordChanged: false,
});
