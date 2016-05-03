import {handleActions} from 'redux-actions';

const CHALLENGE_LOAD = 'challengeDetails/CHALLENGE_LOAD';

export function loadChallenge(id) {
  return {
    fatal: true,
    type: CHALLENGE_LOAD,
    promise: ({client}) => client.get('/problems/' + id)
  };
}

export default handleActions({
  [CHALLENGE_LOAD]: (state, {payload: challenge}) => ({...state, challenge})
}, {});