const LOAD = 'challengeDetails/LOAD';
const LOAD_SUCCESS = 'challengeDetails/LOAD_SUCCESS';
const LOAD_FAIL = 'challengeDetails/LOAD_FAIL';

const initialState = {
  loading: true,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {...state, loading: true};
    case LOAD_SUCCESS:
      return {...state, loading: false, challenge: action.result};
    case LOAD_FAIL:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
}

export function loadChallenge(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/v1/problems/' + id)
  };
}
