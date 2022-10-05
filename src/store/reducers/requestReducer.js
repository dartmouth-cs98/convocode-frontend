// Reference:
// https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

import { requestStates } from '../../utils/store';

const reducer = (state = {}, action) => {
  /**
   * Keeps track of whether or not the requestName is associated with a request or a response
   * Will assign true to the value of requestName within the loadingReducer if the request has not completed,
   * and false if the request completes. This allows you to check loading through the loadingReducer automatically   *
   */
  const updatedState = {
    ...state,
    [action.type]: {
      loading: action.status === requestStates.REQUEST,
      message: action.status === requestStates.FAILURE ? action.payload.message : '',
      code: action.status === requestStates.FAILURE ? action.payload.code : null
    }
  };

  return updatedState;
};

export default reducer;
