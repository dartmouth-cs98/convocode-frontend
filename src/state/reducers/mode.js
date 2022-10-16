import { ActionTypes } from '../actions';

const initialState = {
  lightMode: true,
};

const ModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_VIEW_MODE:
      return { ...state, lightMode: !state.lightMode };

    default:
      return state;
  }
};

export default ModeReducer;
