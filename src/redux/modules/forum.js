import {handleActions} from 'redux-actions';

const INIT_CATEGORIES = 'forum/INIT_CATEGORIES';
const INIT_CATEGORY = 'forum/INIT_CATEGORY';
const IGNORE = 'forum/IGNORE';

export function initCategories() {
  return {
    fatal: true,
    type: INIT_CATEGORIES,
    promise: ({ client }) => client.get('/forum/categories')
  };
}

export function initCategory(id) {
  return {
    fatal: true,
    type: INIT_CATEGORY,
    promise: ({ client }) => client.get('/forum/category/' + id)
  };
}


export default handleActions({
  [INIT_CATEGORIES]: (state, { payload: categories }) => {
    return { ...state, categories };
  },
  [INIT_CATEGORY]: (state, { payload: category }) => {
    return { ...state, category };
  },
}, {
  categories: [],
  category: {},
});
