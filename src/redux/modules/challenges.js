import { createAction, handleActions } from 'redux-actions';
import _ from 'underscore';

const LOAD_CHALLENGES = 'challenges/LOAD_CHALLENGES';
const TOGGLE_FILTER = 'challenges/TOGGLE_FILTER';

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

export const toggleFilter = createAction(TOGGLE_FILTER);

export function init() {
  return {
    fatal: true,
    type: LOAD_CHALLENGES,
    promise: ({ client }) => client.get('problems'),
  };
}

export default handleActions({
  [LOAD_CHALLENGES]: (state, { payload: items }) => {
    const newState = { ...state };
    newState.challenges = { items };
    const solved = _.where(items, { solved: true }).length;
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
      tags.push({ name, count });
    });
    tags.sort((a, b) => a.name.localeCompare(b.name));
    newState.challenges.allItems = items;
    newState.filter = {};
    newState.filters = [
      {
        name: 'level',
        items: [
          { name: 'Very Easy', count: _.where(items, { level: 'Very Easy' }).length },
          { name: 'Easy', count: _.where(items, { level: 'Easy' }).length },
        ],
      },
      {
        name: 'tags',
        items: tags,
      },
      {
        name: 'status',
        items: [
          { name: 'Not Solved', count: items.length - solved },
          { name: 'Solved', count: solved },
        ],
      },
    ];
    return newState;
  },
  [TOGGLE_FILTER]: (state, { payload: { filterName, name } }) => {
    const filter = { ...state.filter };
    const values = filter[filterName] || [];
    if (values.indexOf(name) === -1) {
      filter[filterName] = [...values, name];
    } else {
      filter[filterName] = values.filter((item) => item !== name);
    }
    const challenges = { ...state.challenges };
    challenges.items = _applyFilter(challenges.allItems, filter);
    return { ...state, challenges, filter };
  },
}, {
  challenges: {
    allItems: [],
    items: [],
  },
  filter: {},
  filters: [],
});
