import { ActionTypes } from '../actions';

const initialState = {
  code: "",
};

const CodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CODE:

      return { ...state, speech: { ...initialState.code, ...action.payload}};

    default:
      return state;
  }
};

export default CodeReducer;