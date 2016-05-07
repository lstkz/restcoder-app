import {handleActions} from 'redux-actions';

const LOAD_USER = 'profile/LOAD_USER';


export function init(username) {
  return {
    fatal: true,
    type: LOAD_USER,
    promise: ({ client }) => client.get('/user/' + decodeURIComponent(username))
  };
}


export default handleActions({
  [LOAD_USER]: (state, {payload: user}) => ({...state, user})
}, {
  user: {
    stats: {}
  }
});