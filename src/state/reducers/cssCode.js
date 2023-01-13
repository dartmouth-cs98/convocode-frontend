import { ActionTypes } from '../actions';

const initialState = {
  string: "",
};

const CSSCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CSS_CODE:
      return { ...state, string: action.payload };
    case ActionTypes.INSERT_CSS_CODE:
      return { ...state, string: state.string + action.payload };
    default:
      return state;
  }
};

export default CSSCodeReducer;