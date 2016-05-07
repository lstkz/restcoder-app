const FATAL_ERROR = 'FATAL_ERROR';
const START_LOADER = 'START_LOADER';
const END_LOADER = 'END_LOADER';

export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      if (action.fatal) {
        return action.promise({client, dispatch, getState})
          .then((payload) => {
            next({type: action.type, payload});
          })
          .catch((err) => {
            console.log(err);
            if (err && err.stack) {
              console.log(err.stack);
            }
            console.log('FATAL_ERROR');
            next({ type: FATAL_ERROR });
          });
      }

      const { promise, loader, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      if (loader) {
        next({type: START_LOADER});
      }
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => {
          if (loader) {
            next({type: END_LOADER});
          }
          next({...rest, payload: result, type: SUCCESS});
        },
        (error) => {
          if (loader) {
            next({type: END_LOADER});
          }
          next({...rest, error, type: FAILURE});
        }
      ).catch((error)=> {
        if (loader) {
          next({type: END_LOADER});
        }
        console.error('MIDDLEWARE ERROR:', error, error.stack);
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}
