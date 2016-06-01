import {createAction, handleActions} from 'redux-actions';
import React from 'react';
import ApiClient from '../../helpers/ApiClient';
const apiClient = new ApiClient();

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DATA = 'editProfile::LOAD_DATA';


// ------------------------------------
// Actions
// ------------------------------------


export const loadData = () => (dispatch, getState) => {
  dispatch({type: LOAD_DATA, payload: getState().auth.user});
};

export const handleInfoSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.post('/user', { data: values })
      .then((result) => {
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
}, {
  user: {},
});
