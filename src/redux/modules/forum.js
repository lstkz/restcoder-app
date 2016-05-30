import React from 'react';
import marked from 'marked';
import update from 'react-addons-update';
import {handleActions, createAction} from 'redux-actions';
import {push, transitionTo} from 'react-router-redux';
import ApiClient from '../../helpers/ApiClient';
import {ERROR} from './global';
const apiClient = new ApiClient();

const MIN_TITLE_LENGTH = 3;
const MIN_CONTENT_LENGTH = 8;

const INIT_CATEGORIES = 'forum/INIT_CATEGORIES';
const INIT_CATEGORY = 'forum/INIT_CATEGORY';
const INIT_TOPIC = 'forum/INIT_TOPIC';
const LOAD_CATEGORY_PAGE = 'forum/LOAD_CATEGORY_PAGE';
const SHOW_COMPOSER = 'forum/SHOW_COMPOSER';
const SET_COMPOSER_CONTENT = 'forum/SET_COMPOSER_CONTENT';
const SET_COMPOSER_TITLE = 'forum/SET_COMPOSER_TITLE';
const SET_COMPOSER_CATEGORY = 'forum/SET_COMPOSER_CATEGORY';
const HIDE_COMPOSER = 'forum/HIDE_COMPOSER';
const TOGGLE_COMPOSER_PREVIEW = 'forum/TOGGLE_COMPOSER_PREVIEW';
const COMPOSER_ERROR = 'forum/COMPOSER_ERROR';

function _getReplySubject(topic) {
  return `Replying to "${topic.title}"`;
}

function _handleError(e, dispatch) {
  console.error(e);
  dispatch({type: ERROR, payload: e.error || 'Unexpected error occurred' });
}

export function initCategories() {
  return {
    fatal: true,
    type: INIT_CATEGORIES,
    promise: ({ client }) => client.get('/forum/categories')
  };
}

export function initCategory(id, page) {
  return {
    fatal: true,
    type: INIT_CATEGORY,
    promise: ({ client }) => Promise.all([client.get('/forum/category/' + id, {params: {page}}), client.get('/forum/categories')])
  };
}

export function initTopic(id, page) {
  return {
    fatal: true,
    type: INIT_TOPIC,
    promise: ({ client }) => Promise.all([client.get('/forum/topic/' + id, {params: {page}}), client.get('/forum/categories')])
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
    let result;
    let pid;
    switch (composer.mode) {
      case 'new':
        result = await apiClient.post('/forum/topics', {
          data: {
            cid: composer.category,
            title: composer.title,
            content: composer.content
          }
        });
        pid = result.postData.pid;
        break;
      case 'reply':
        result = await apiClient.post('/forum/topics/' + composer.tid, {
          data: {
            content: composer.content
          }
        });
        pid = result.pid;
        break;
      case 'edit':
        result = await apiClient.put('/forum/topics/' + composer.tid, {
          data: {
            pid: composer.pid,
            content: composer.content
          }
        });
        pid = composer.pid;
        break;
      default:
        return;
    }
    dispatch(push(`/post/${pid}`));
    dispatch({type: HIDE_COMPOSER});
  } catch (e) {
    dispatch({ type: COMPOSER_ERROR, payload: e.error || 'Unexpected error occurred' });
  }
};


export const quotePost = (post, topic) => async function(dispatch) {
  try {
    let {content} = await apiClient.get('/forum/raw-post/' + post.pid);
    const quoted = '> ' + content.split('\n').join('\n> ');
    content = `@${post.user.username} said in [${topic.title}](/post/${post.pid}):\n${quoted}\n\n`;
    dispatch({type: SHOW_COMPOSER, payload: {
      mode: 'reply',
      tid: topic.tid,
      content,
      isTitleReadOnly: true,
      title: _getReplySubject(topic)
    }});
  } catch (e) {
    _handleError(e, dispatch);
  }
};

export const editPost = (post, topic) => async function(dispatch) {
  try {
    const {content} = await apiClient.get('/forum/raw-post/' + post.pid);
    dispatch({type: SHOW_COMPOSER, payload: {
      mode: 'edit',
      pid: post.pid,
      tid: topic.tid,
      content,
      isTitleReadOnly: true,
      title: _getReplySubject(topic)
    }});
  } catch (e) {
    _handleError(e, dispatch);
  }
};

export const replyPost = (post, topic) => function(dispatch) {
  dispatch({type: SHOW_COMPOSER, payload: {
    mode: 'reply',
    tid: topic.tid,
    content: post ? `@${post.user.username}\n\n` : '',
    isTitleReadOnly: true,
    title: _getReplySubject(topic)
  }});
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
  [LOAD_CATEGORY_PAGE]: (state, {payload: category}) => ({...state, category}),
  [SHOW_COMPOSER]: (state, { payload: { content = '', ...rest } }) => {
    const composer = { ...state.composer, ...rest };
    if (!composer.isVisible) {
      return { ...state, composer: {
        ..._getDefaultComposerValues(),
        content,
        preview: marked(content, {sanitize: true}),
        isVisible: true,
        isShowPreview: true,
        focusKey: new Date().getTime(),
        ...rest} };
    }
    if (content) {
      composer.content += '\n' + content;
      composer.preview = marked(composer.content, {sanitize: true});
    }
    if (rest.category) {
      composer.category = rest.category;
    }
    composer.focusKey = new Date().getTime();
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
