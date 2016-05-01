const LOAD_CHALLENGES = 'challenges/LOAD_CHALLENGES';
const LOAD_CHALLENGES_SUCCESS = 'challenges/LOAD_CHALLENGES_SUCCESS';
const LOAD_CHALLENGES_FAIL = 'challenges/LOAD_CHALLENGES_FAIL';
const LOAD_RECENT_SUBMISSIONS = 'challenges/LOAD_RECENT_SUBMISSIONS';
const LOAD_RECENT_SUBMISSIONS_SUCCESS = 'challenges/LOAD_RECENT_SUBMISSIONS_SUCCESS';
const LOAD_RECENT_SUBMISSIONS_FAIL = 'challenges/LOAD_RECENT_SUBMISSIONS_FAIL';
const LOAD_TOP5 = 'challenges/LOAD_RECENT_SUBMISSIONS';
const LOAD_TOP5_SUCCESS = 'challenges/LOAD_TOP5_SUCCESS';
const LOAD_TOP5_FAIL = 'challenges/LOAD_TOP5_FAIL';

const CHALLENGES_TYPES = [LOAD_CHALLENGES, LOAD_CHALLENGES_SUCCESS, LOAD_CHALLENGES_FAIL];
const LOAD_RECENT_TYPES = [LOAD_RECENT_SUBMISSIONS, LOAD_RECENT_SUBMISSIONS_SUCCESS, LOAD_RECENT_SUBMISSIONS_FAIL];
const TOP5_TYPES = [LOAD_TOP5, LOAD_TOP5_SUCCESS, LOAD_TOP5_FAIL];

const initialState = {
  challenges: {
    loading: true,
    items: [],
    error: null
  },
  top5: {
    loading: true,
    items: [],
    error: null
  },
  recent: {
    loading: true,
    items: [],
    error: null
  }
};

function _applyApiResult(state, action, [LOAD, SUCCESS, FAIL], prop) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [prop]: {
          ...state[prop],
          loading: true,
          error: null
        }
      };
    case SUCCESS:
      return {
        ...state,
        [prop]: {
          ...state[prop],
          loading: false,
          items: action.result
        }
      };
    case FAIL:
      return {
        ...state,
        [prop]: {
          ...state[prop],
          loading: false,
          error: action.error
        }
      };
    default:
      return null;
  }
}


export default function reducer(state = initialState, action = {}) {
  const newState =
    _applyApiResult(state, action, CHALLENGES_TYPES, 'challenges') ||
    _applyApiResult(state, action, LOAD_RECENT_TYPES, 'recent') ||
    _applyApiResult(state, action, TOP5_TYPES, 'top5');
  if (newState) {
    return newState;
  }
  switch (action.type) {
    default:
      return state;
  }
}

export function loadChallenges() {
  return {
    types: CHALLENGES_TYPES,
    promise: (client) => client.get('problems')
  };
}

export function loadRecentSubmissions() {
  return {
    types: LOAD_RECENT_TYPES,
    promise: (client) => client.get('/submissions/recent')
  };
}

export function loadTop5(language) {
  const params = {
    limit: 5
  };
  if (language) {
    params.language = language;
  }
  return {
    types: TOP5_TYPES,
    promise: (client) => client.get('/ranking', {params})
  };
}
