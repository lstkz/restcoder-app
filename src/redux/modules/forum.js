import React from 'react';
import marked from 'marked';
import update from 'react-addons-update';
import {handleActions, createAction} from 'redux-actions';

const INIT_CATEGORIES = 'forum/INIT_CATEGORIES';
const INIT_CATEGORY = 'forum/INIT_CATEGORY';
const INIT_TOPIC = 'forum/INIT_TOPIC';
const SHOW_COMPOSER = 'forum/SHOW_COMPOSER';
const SET_COMPOSER_CONTENT = 'forum/SET_COMPOSER_CONTENT';
const SET_COMPOSER_TITLE = 'forum/SET_COMPOSER_TITLE';
const TOGGLE_COMPOSER_PREVIEW = 'forum/TOGGLE_COMPOSER_PREVIEW';
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

export function initTopic(id) {
  return {
    fatal: true,
    type: INIT_TOPIC,
    promise: ({ client }) => client.get('/forum/topic/' + id)
  };
}

export const showComposer = createAction(SHOW_COMPOSER);
export const setComposerContent = createAction(SET_COMPOSER_CONTENT);
export const setComposerTitle = createAction(SET_COMPOSER_TITLE);
export const toggleComposerPreview = createAction(TOGGLE_COMPOSER_PREVIEW);

export default handleActions({
  [INIT_CATEGORIES]: (state, { payload: categories }) => {
    return { ...state, categories };
  },
  [INIT_CATEGORY]: (state, { payload: category }) => {
    return { ...state, category };
  },
  [INIT_TOPIC]: (state, { payload: topic }) => {
    return { ...state, topic };
  },
  [SHOW_COMPOSER]: (state, { payload: { title, content, isTitleReadOnly } }) => {
    const composer = { ...state.composer };
    if (!composer.isVisible) {
      return { ...state, composer: { isVisible: true, isShowPreview: true, title, content, isTitleReadOnly } };
    }
    if (!content) {
      return state;
    }
    composer.content += '\n' + content;
    composer.preview = marked(composer.content, {sanitize: true});
    return { ...state, composer };
  },
  [SET_COMPOSER_CONTENT]: (state, { payload: content }) => update(state, {
    composer: {
      $merge: {
        content,
        preview: marked(content, {sanitize: true})
      }
    }
  }),
  [SET_COMPOSER_TITLE]: (state, { payload: title }) => update(state, {
    composer: { $merge: { title } }
  }),
  [TOGGLE_COMPOSER_PREVIEW]: (state) => update(state, {
    composer: { $merge: { isShowPreview: !state.compoer.isShowPreview } }
  }),
}, {
  categories: [],
  category: {},
  composer: {
    isVisible: true,
    isShowPreview: true,
    title: '',
    content: '',
    isTitleReadOnly: false,
  }
});
