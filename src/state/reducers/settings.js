import { ActionTypes } from '../actions';

const initialState = {
  lightMode: true,
  fontSize: '12px',
};

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_VIEW_MODE:
      return { ...state, lightMode: !state.lightMode };
    case ActionTypes.UPDATE_FONT_SIZE:
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
};

export default SettingsReducer;
