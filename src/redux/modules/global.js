import { createAction } from 'redux-actions';

const BEGIN_GLOBAL_LOAD = 'reduxAsyncConnect/BEGIN_GLOBAL_LOAD';
const END_GLOBAL_LOAD = 'reduxAsyncConnect/END_GLOBAL_LOAD';
export const ERROR = 'global/ERROR';
export const FATAL_ERROR = 'FATAL_ERROR';
const CLEAR_ERROR = 'global/CLEAR_ERROR';
const START_LOADER = 'START_LOADER';
const END_LOADER = 'END_LOADER';
const NOT_FOUND = 'NOT_FOUND';
const FORUM_UNREAD_TOTAL = 'FORUM_UNREAD_TOTAL';

const initialState = {
  loading: false,
  isFatal: false,
  fatalTimestamp: null,
  error: null,
  forumUnreadTotal: 0
};

export const loadForumUnreadTotal = async (client, dispatch) => {
  try {
    const {count} = await client.get('/forum/unread/total');
    dispatch({type: FORUM_UNREAD_TOTAL, payload: count});
  } catch (e) {
    console.error('loadForumUnreadTotal', e);
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_LOADER:
    case BEGIN_GLOBAL_LOAD:
      return {
        ...state,
        loading: true,
        isFatal: false,
      };
    case END_LOADER:
    case END_GLOBAL_LOAD:
      return {
        ...state,
        loading: false,
      };
    case NOT_FOUND:
      return { ...state, notFound: true };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case FATAL_ERROR:
      return { ...state, isFatal: true, fatalTimestamp: new Date().toISOString() };
    case ERROR:
      const obj = action.error || action.payload;
      return {
        ...state,
        error: obj.error || obj.message || 'An error occurred. Please refresh page.',
      };
    case FORUM_UNREAD_TOTAL:
      return {...state, forumUnreadTotal: action.payload};
    default:
      return state;
  }
}

export const clearError = createAction(CLEAR_ERROR);
export const setError = createAction(ERROR);
