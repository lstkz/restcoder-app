import {createAction, handleActions} from 'redux-actions';


const LOAD_RANKING = 'ranking/LOAD_RANKING';

export function init() {
  return {
    fatal: true,
    type: LOAD_RANKING,
    promise: ({client}) => client.get('/ranking')
  };
}


export default handleActions({
  [LOAD_RANKING]: (state, {payload: {items, total}}) => ({...state, items, total})
}, {
  items: [],
  total: 0,
  type: 'global',
  types: ['global', 'nodejs', 'ruby']
})