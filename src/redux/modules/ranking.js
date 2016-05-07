import {handleActions} from 'redux-actions';
import {ERROR} from './global';

const PAGE_SIZE = 10;
const LOAD_RANKING = 'ranking/LOAD_RANKING';
const LANGUAGE_CHANGE = 'ranking/LANGUAGE_CHANGE';
const CHANGE_PAGE = 'ranking/CHANGE_PAGE';
const IGNORE = 'ranking/IGNORE';

function _getTotalPages(total) {
  return Math.ceil(total / PAGE_SIZE);
}

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
    loader: true,
    types: [IGNORE, CHANGE_PAGE, ERROR],
    promise: async ({client, getState}) => {
      const params = {};
      const {language} = getState().ranking;
      if (language && language !== 'any') {
        params.language = language;
      }
      params.offset = page * PAGE_SIZE;
      const result = await client.get('/ranking/', { params });
      result.page = page;
      return result;
    }
  };
}

export function changeLanguage(language) {
  const params = {};
  if (language !== 'any') {
    params.language = language;
  }
  return {
    loader: true,
    types: [IGNORE, LANGUAGE_CHANGE, ERROR],
    promise: async ({client}) => {
      const result = await client.get('/ranking/', { params });
      result.language = language;
      return result;
    }
  };
}

export default handleActions({
  [LOAD_RANKING]: (state, { payload: [{ items, total }, filters] }) => {
    return { ...state, items, total, filters, language: 'any', page: 0, totalPages: _getTotalPages(total) };
  },
  [LANGUAGE_CHANGE]: (state, { payload: { items, total, language } }) => {
    return ({ ...state, language, items, total, page: 0, totalPages: _getTotalPages(total) });
  },
  [CHANGE_PAGE]: (state, { payload: { items, total, page } }) => {
    return ({ ...state, page, items, total });
  }
}, {
  items: [],
  params: {},
  page: 0,
  totalPages: 0,
  total: 0,
  filters: []
});
