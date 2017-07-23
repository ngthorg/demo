function isFunc(func) {
  return func && typeof func === 'function';
}

export default function promiseMiddleware({ dispatch, getState }) {
  return next => action => {
    const { promise, types, ...others } = action;

    if (!promise) {
      return isFunc(action) ? action(dispatch, getState) : next(action);
    }

    const [REQUEST, SUCCESS, FAIL] = types;

    next({ ...others, type: REQUEST });
    return promise
      .then(res =>
        next({ ...others, data: res.data, status: res.status, type: SUCCESS }),
      )
      .catch(err =>
        next({ ...others, err: err.data, status: err.status, type: FAIL }),
      );
  };
}
