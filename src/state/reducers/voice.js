import { ActionTypes } from '../actions';

const initialState = {
  speech: [],
};

const VoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_SPEECH:

      return { ...state, speech: { ...initialState.speech, ...action.payload}};

    default:
      return state;
  }
};

export default VoiceReducer;