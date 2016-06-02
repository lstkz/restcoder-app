import {handleActions} from 'redux-actions';
import {initialize, reset as resetForm} from 'redux-form';
import ApiClient from '../../helpers/ApiClient';
const apiClient = new ApiClient();

import {USER_UPDATED} from './shared';
import {ERROR} from './global';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DATA = 'editProfile::LOAD_DATA';
export const IGNORE = 'editProfile::IGNORE';


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

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [LOAD_DATA]: (state, { payload: user }) => ({ ...state, user }),
  [USER_UPDATED]: (state, { payload: user }) => ({ ...state, user }),
}, {
  user: {},
});
