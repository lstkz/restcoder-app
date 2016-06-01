import {createAction, handleActions} from 'redux-actions';
import React from 'react';
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
      .catch((result) => {
        reject({ _error: result.error || 'Unexpected error occurred' });
      });
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
