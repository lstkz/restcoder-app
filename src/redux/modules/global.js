const BEGIN_GLOBAL_LOAD = 'reduxAsyncConnect/BEGIN_GLOBAL_LOAD';
const END_GLOBAL_LOAD = 'reduxAsyncConnect/END_GLOBAL_LOAD';

const initialState = {
  loading: false
};


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BEGIN_GLOBAL_LOAD:
      return {
        ...state,
        loading: true
      };
    case END_GLOBAL_LOAD:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}