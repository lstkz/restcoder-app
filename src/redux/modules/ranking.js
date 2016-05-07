import {handleActions} from 'redux-actions';
import {GLOBAL_ERROR} from './global';


const LOAD_RANKING = 'ranking/LOAD_RANKING';
const LANGUAGE_CHANGE = 'ranking/LANGUAGE_CHANGE';
const IGNORE = 'ranking/IGNORE';

export function init() {
  console.log('init');
  return {
    fatal: true,
    type: LOAD_RANKING,
    promise: ({ client }) => Promise.all([client.get('/ranking'), client.get('/ranking/filter')])
  };
}

export function changeLanguage(language) {
  return function (dispatch, getState) {
    dispatch({type: IGNORE})
  }
  const params = {};
  if (language !== 'any') {
    params.language = language;
  }
  return {
    language,
//    loader: true,
    types: [IGNORE, LANGUAGE_CHANGE, GLOBAL_ERROR],
    promise: (client) => client.get('/ranking/', { params })
  };
}

export default handleActions({
  [LOAD_RANKING]: (state, { payload: [{ items, total }, filters] }) => {
    return { ...state, items, total, filters, filter: { language: ['any'] } };
  },
  [LANGUAGE_CHANGE]: (state, { payload: { items, total }, language }) => {
    return ({ ...state, filter: { language: [language] }, items, total });
  }
}, {
  items: [],
  total: 0,
  filter: {
    language: ['any']
  },
  filters: [],
  type: 'global',
  types: ['global', 'nodejs', 'ruby']
});
