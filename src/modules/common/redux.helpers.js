// Helper function to enable passing an object with action.type as the key
// and the reducer function as value.
export const createReducer = (initialState = {}, actionHandlerKeyFuncs = {}) => {
  return(state = initialState, action) => {
    const actionHandler = actionHandlerKeyFuncs[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  }
};