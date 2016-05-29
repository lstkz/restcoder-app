import React from 'react';
import marked from 'marked';
import update from 'react-addons-update';
import {handleActions, createAction} from 'redux-actions';
import {push} from 'react-router-redux';
import ApiClient from '../../helpers/ApiClient';
const apiClient = new ApiClient();

const MIN_TITLE_LENGTH = 3;
const MIN_CONTENT_LENGTH = 8;

const INIT_CATEGORIES = 'forum/INIT_CATEGORIES';
const INIT_CATEGORY = 'forum/INIT_CATEGORY';
const INIT_TOPIC = 'forum/INIT_TOPIC';
const SHOW_COMPOSER = 'forum/SHOW_COMPOSER';
const SET_COMPOSER_CONTENT = 'forum/SET_COMPOSER_CONTENT';
const SET_COMPOSER_TITLE = 'forum/SET_COMPOSER_TITLE';
const SET_COMPOSER_CATEGORY = 'forum/SET_COMPOSER_CATEGORY';
const HIDE_COMPOSER = 'forum/HIDE_COMPOSER';
const TOGGLE_COMPOSER_PREVIEW = 'forum/TOGGLE_COMPOSER_PREVIEW';
const IGNORE = 'forum/IGNORE';
const COMPOSER_ERROR = 'forum/COMPOSER_ERROR';


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
    promise: ({ client }) => Promise.all([client.get('/forum/category/' + id), client.get('/forum/categories')])
  };
}

export function initTopic(id) {
  return {
    fatal: true,
    type: INIT_TOPIC,
    promise: ({ client }) => Promise.all([client.get('/forum/topic/' + id), client.get('/forum/categories')])
  };
}

export const submitPost = () => async function(dispatch, getState) {
  const {composer} = getState().forum;
  dispatch({ type: COMPOSER_ERROR, payload: null });
  if (composer.title.length < MIN_TITLE_LENGTH) {
    dispatch({
      type: COMPOSER_ERROR,
      payload: `Please enter a longer title. Titles should contain at least ${MIN_TITLE_LENGTH} character(s).`
    });
    return;
  }
  if (composer.content.length < MIN_CONTENT_LENGTH) {
    dispatch({
      type: COMPOSER_ERROR,
      payload: `Please enter a longer post. Posts should contain at least ${MIN_CONTENT_LENGTH} character(s).`
    });
    return;
  }
  try {
    const result = await apiClient.post('/forum/topics', {
      data: {
        cid: composer.category,
        title: composer.title,
        content: composer.content
      }
    });
    dispatch(push(`/forum/topic/${result.topicData.slug}`));
    dispatch({type: HIDE_COMPOSER});
  } catch (e) {
    dispatch({ type: COMPOSER_ERROR, payload: e.error || 'Unexpected error occurred' });
  }
};

export const showComposer = createAction(SHOW_COMPOSER);
export const setComposerContent = createAction(SET_COMPOSER_CONTENT);
export const setComposerTitle = createAction(SET_COMPOSER_TITLE);
export const setComposerCategory = createAction(SET_COMPOSER_CATEGORY);
export const toggleComposerPreview = createAction(TOGGLE_COMPOSER_PREVIEW);
export const hideComposer = createAction(HIDE_COMPOSER);
export const clearComposeError = createAction(COMPOSER_ERROR);


function _getDefaultComposerValues() {
  return {
    mode: null,
    isVisible: false,
    isShowPreview: true,
    title: '',
    content: '',
    category: null,
    isTitleReadOnly: false,
  };
}

export default handleActions({
  [INIT_CATEGORIES]: (state, { payload: categories }) => {
    return { ...state, categories };
  },
  [INIT_CATEGORY]: (state, { payload: [category, categories] }) => {
    return { ...state, category, categories };
  },
  [INIT_TOPIC]: (state, { payload: [topic, categories] }) => {
    return { ...state, topic, categories };
  },
  [SHOW_COMPOSER]: (state, { payload: { content, ...rest } }) => {
    const composer = { ...state.composer };
    if (!composer.isVisible) {
      return { ...state, composer: { ..._getDefaultComposerValues(), isVisible: true, isShowPreview: true, ...rest} };
    }
    if (content) {
      composer.content += '\n' + content;
      composer.preview = marked(composer.content, {sanitize: true});
    }
    if (rest.category) {
      composer.category = rest.category;
    }
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
  [SET_COMPOSER_CATEGORY]: (state, { payload: category }) => update(state, {
    composer: { $merge: { category } }
  }),
  [TOGGLE_COMPOSER_PREVIEW]: (state) => update(state, {
    composer: { $merge: { isShowPreview: !state.composer.isShowPreview } }
  }),
  [COMPOSER_ERROR]: (state, {payload: error}) => update(state, {
    composer: { $merge: { error } }
  }),
  [HIDE_COMPOSER]: (state) => update(state, {
    composer: { $set: _getDefaultComposerValues() }
  }),
}, {
  categories: [],
  category: {},
  composer: _getDefaultComposerValues()
});
