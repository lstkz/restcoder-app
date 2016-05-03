import {createAction} from 'redux-actions';

const BEGIN_GLOBAL_LOAD = 'reduxAsyncConnect/BEGIN_GLOBAL_LOAD';
const END_GLOBAL_LOAD = 'reduxAsyncConnect/END_GLOBAL_LOAD';
export const ERROR = 'global/ERROR';
const CLEAR_ERROR = 'global/CLEAR_ERROR';

const initialState = {
  loading: false,
  error: null
};


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BEGIN_GLOBAL_LOAD:
      return {
        ...state,
        loading: true
      };
    case END_GLOBAL_LOAD:
      return {
        ...state,
        loading: false
      };
    case CLEAR_ERROR:
      return {...state, error: null};
    case ERROR:
      const obj = action.error || action.payload;
      return {
        ...state,
        error: obj.error || obj.message || 'An error occurred. Please refresh page.'
      };
    default:
      return state;
  }
}

export const clearError = createAction(CLEAR_ERROR);
