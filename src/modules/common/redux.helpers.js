// Helper function to enable passing an object with action.type as the key
// and the reducer function as value.
export const createReducer = (
  initialState = {},
  actionHandlerKeyFuncs = {}
) => {
  return (state = initialState, action) => {
    const actionHandler = actionHandlerKeyFuncs[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  };
};

//create a basic action
const createAction = (type, actionProps) => {
  return {
    type,
    ...actionProps
  };
};

//--
export const createAsyncActionCreator = (
  actionType,
  asyncRequestFn,
  requestParams
) => {
  return dispatch => {
    dispatch(createAction(`${actionType}_START`, { request: requestParams }));
    //note: asyncRequestFn must accpet single object param.
    //in order to resolve param values
    return asyncRequestFn(requestParams).then(response => {
      response
        .json()
        .then(json =>
          dispatch(createAction(`${actionType}_SUCCESS`, { response: json }))
        )
        .catch(error =>
          dispatch(createAction(`${actionType}_ERROR`, { error }))
        );
    });
  };
};

const initialAsyncState = { isLoading: false, response: null, request: null };

//generic way of handling state changes for an async request
// allowable async reducer overrides are:
// {actionType}_START, {actionType}_SUCCESS and {actionTypes}_ERROR
export const createAsyncReducer = (
  actionType,
  actionHandlerKeyFuncs = {},
  initialState = initialAsyncState
) => {
  const startReducerOverrideFn = actionHandlerKeyFuncs[`${actionType}_START`];
  const startReducerFn = (state, action) => ({
    ...state,
    isLoading: true,
    request: action.request
  });
  const successReducerOverrideFn =
    actionHandlerKeyFuncs[`${actionType}_SUCCESS`];
  const successReducerFn = successReducerOverrideFn
    ? successReducerOverrideFn
    : (state, action) => ({
        ...state,
        isLoading: false,
        response: action.response
      });
  const errorReducerOverrideFn = actionHandlerKeyFuncs[`${actionType}_ERROR`];
  const errorReducerFn = (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  });

  return createReducer(initialState, {
    [`${actionType}_START`]: startReducerFn,
    [`${actionType}_SUCCESS`]: successReducerFn,
    [`${actionType}_ERROR`]: errorReducerFn
  });
};
