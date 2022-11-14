import { ActionTypes } from '../actions';

const initialState = {
  entries: {},
};

const ConvodexReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ENTRY:
      return {
        ...state, entries: action.payload
      };
    default:
      return state;
  }
};

export default ConvodexReducer;