import { ActionTypes } from '../actions';

const initialState = {
  string: "",
};

const HTMLCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_HTML_CODE:
      return { ...state, string: action.payload };
    case ActionTypes.INSERT_HTML_CODE:
      return { ...state, string: state.string + action.payload };
    default:
      return state;
  }
};

export default HTMLCodeReducer;