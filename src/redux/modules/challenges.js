
import {createAction, handleActions} from 'redux-actions';
import _ from 'underscore';

const LOAD_CHALLENGES = 'challenges/LOAD_CHALLENGES';
const LOAD_CHALLENGES_SUCCESS = 'challenges/LOAD_CHALLENGES_SUCCESS';
const LOAD_CHALLENGES_FAIL = 'challenges/LOAD_CHALLENGES_FAIL';
const LOAD_RECENT_SUBMISSIONS = 'challenges/LOAD_RECENT_SUBMISSIONS';
const LOAD_RECENT_SUBMISSIONS_SUCCESS = 'challenges/LOAD_RECENT_SUBMISSIONS_SUCCESS';
const LOAD_RECENT_SUBMISSIONS_FAIL = 'challenges/LOAD_RECENT_SUBMISSIONS_FAIL';
const LOAD_TOP5 = 'challenges/LOAD_RECENT_SUBMISSIONS';
const LOAD_TOP5_SUCCESS = 'challenges/LOAD_TOP5_SUCCESS';
const LOAD_TOP5_FAIL = 'challenges/LOAD_TOP5_FAIL';
const TOGGLE_FILTER = 'challenges/TOGGLE_FILTER';

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
  },
  filter: {

  },
  filters: []
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

function _applyFilter(items, filter) {
  let filtered = items;

  if (filter.level && filter.level.length) {
    filtered = filtered.filter((item) => {
      return filter.level.indexOf(item.level) !== -1;
    });
  }

  if (filter.tags && filter.tags.length) {
    filtered = filtered.filter((item) => {
      return _.intersection(item.tags, filter.tags).length;
    });
  }

  if (filter.status && filter.status.length === 1) {
    const solved = filter.status[0] === 'Solved';
    filtered = filtered.filter((item) => {
      return (!!item.solved) === solved;
    });
  }

  return filtered;
}

function _countBeLevel(items, levelName) {
  return _.findWhere(items, {level: levelName}).length;
}

export default function reducer(state = initialState, action = {}) {
  const newState =
    _applyApiResult(state, action, CHALLENGES_TYPES, 'challenges') ||
    _applyApiResult(state, action, LOAD_RECENT_TYPES, 'recent') ||
    _applyApiResult(state, action, TOP5_TYPES, 'top5');
  if (action.type === LOAD_CHALLENGES_SUCCESS) {
    const items = newState.challenges.items;
    const solved = _.where(items, {solved: true}).length;
    const tagsMap = {};
    const tags = [];
    items.forEach((item) => {
      item.tags.forEach((tag) => {
        if (!tagsMap[tag]) {
          tagsMap[tag] = 0;
        }
        tagsMap[tag]++;
      });
    });
    _.each(tagsMap, (count, name) => {
      tags.push({name, count});
    });
    tags.sort((a, b) => a.name.localeCompare(b.name));
    newState.challenges.allItems = items;
    newState.filter = {};
    newState.filters = [
      {
        name: 'level',
        items: [
          {name: 'Very Easy', count: _.where(items, {level: 'Very Easy'}).length},
          {name: 'Easy', count: _.where(items, {level: 'Easy'}).length}
        ]
      },
      {
        name: 'tags',
        items: tags
      },
      {
        name: 'status',
        items: [
          {name: 'Not Solved', count: items.length - solved},
          {name: 'Solved', count: solved}
        ]
      }
    ];
  }
  if (newState) {
    return newState;
  }
  switch (action.type) {
    case TOGGLE_FILTER:
      const filter = {...state.filter};
      const {filterName, name} = action.payload;
      const values = filter[filterName] || [];
      if (values.indexOf(name) === -1) {
        filter[filterName] = [...values, name];
      } else {
        filter[filterName] = values.filter((item) => item !== name);
      }
      const challenges = {...state.challenges};
      challenges.items = _applyFilter(challenges.allItems, filter);
      return {...state, challenges, filter};
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

export const toggleFilter = createAction(TOGGLE_FILTER);