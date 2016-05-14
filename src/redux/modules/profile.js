import { handleActions } from 'redux-actions';
import { ERROR } from './global';

const PAGE_SIZE = 10;
const LOAD_USER = 'profile/LOAD_USER';
const IGNORE = 'profile/IGNORE';
const CHANGE_SUBMISSION_PAGE = 'profile/CHANGE_SUBMISSION_PAGE';


export function init(username) {
  return {
    fatal: true,
    type: LOAD_USER,
    promise: ({ client }) => {
      const usernameDecoded = decodeURIComponent(username);
      return Promise.all([
        client.get('/user/' + usernameDecoded),
        client.get('/user/' + usernameDecoded + '/submissions', { params: { limit: PAGE_SIZE } }),
      ]);
    },
  };
}

export function changeSubmissionsPage(page) {
  return {
    loader: true,
    types: [IGNORE, CHANGE_SUBMISSION_PAGE, ERROR],
    promise: ({ client, getState }) => {
      const { user } = getState().profile;
      const usernameDecoded = decodeURIComponent(user.username);
      return client.get('/user/' + usernameDecoded + '/submissions', {
        params: {
          offset: page * PAGE_SIZE,
          limit: PAGE_SIZE,
        },
      });
    },
  };
}

export default handleActions({
  [LOAD_USER]: (state, { payload: [user, submissions] }) => ({ ...state, user, submissions }),
  [CHANGE_SUBMISSION_PAGE]: (state, { payload: submissions }) => ({ ...state, submissions }),
}, {
  user: {
    stats: {},
  },
  submissions: {
    items: [],
    total: 0,
    pageSize: 0,
    pageNumber: 0,
  },
});
