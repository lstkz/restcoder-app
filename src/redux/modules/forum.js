import {handleActions} from 'redux-actions';

const INIT_CATEGORIES = 'forum/INIT_CATEGORIES';
const IGNORE = 'forum/IGNORE';

export function initCategories() {
  return {
    fatal: true,
    type: INIT_CATEGORIES,
    promise: ({ client }) => client.get('/forum/categories')
  };
}


export default handleActions({
  [INIT_CATEGORIES]: (state, { payload: categories }) => {
    return { ...state, categories };
  },
}, {
  categories: [],
});
