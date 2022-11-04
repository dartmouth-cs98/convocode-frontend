import { ActionTypes } from '../actions';

const initialState = {
  string: "",
};

const CodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CODE:
      return { ...state, string: { ...initialState.string, ...action.payload}};

    default:
      return state;
  }
};

export default CodeReducer;