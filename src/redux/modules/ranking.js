import {handleActions} from 'redux-actions';
import {GLOBAL_ERROR} from './global';

const PAGE_SIZE = 10;
const LOAD_RANKING = 'ranking/LOAD_RANKING';
const LANGUAGE_CHANGE = 'ranking/LANGUAGE_CHANGE';
const CHANGE_PAGE = 'ranking/CHANGE_PAGE';
const IGNORE = 'ranking/IGNORE';

export function init() {
  console.log('init');
  return {
    fatal: true,
    type: LOAD_RANKING,
    promise: ({ client }) => Promise.all([client.get('/ranking'), client.get('/ranking/filter')])
  };
}

export function changePage(page) {
  return {
    page,
    loader: true,
    types: [IGNORE, CHANGE_PAGE, GLOBAL_ERROR],
    promise: ({client, getState}) => {
      const params = {...getState().ranking.params}
      params.offset = (page - 1) * PAGE_SIZE;
      return client.get('/ranking/', { params });
    }
  };
}

export function changeLanguage(language) {
  const params = {};
  if (language !== 'any') {
    params.language = language;
  }
  return {
    params,
    language,
    loader: true,
    types: [IGNORE, LANGUAGE_CHANGE, GLOBAL_ERROR],
    promise: ({client}) => client.get('/ranking/', { params })
  };
}

export default handleActions({
  [LOAD_RANKING]: (state, { payload: [{ items, total }, filters] }) => {
    return { ...state, items, total, filters, filter: { language: ['any'] }, params: {} };
  },
  [LANGUAGE_CHANGE]: (state, { payload: { items, total }, language, params }) => {
    return ({ ...state, filter: { language: [language] }, params, items, total });
  }
}, {
  items: [],
  params: {},
  total: 0,
  filter: {
    language: ['any']
  },
  filters: []
});
