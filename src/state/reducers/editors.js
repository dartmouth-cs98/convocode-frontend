import { ActionTypes } from '../actions';

const initialState = {
  jsRef: null,
  cssRef: null,
  htmlRef: null,
  monacoRef: null,

};

const EditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_JAVA_EDITOR:
      return { ...state, jsRef: action.payload };
    case ActionTypes.SET_CSS_EDITOR:
        return { ...state, cssRef: action.payload };
    case ActionTypes.SET_HTML_EDITOR:
        return { ...state, htmlRef: action.payload };
    case ActionTypes.SET_MONACO_REF:
        return { ...state, monacoRef: action.payload };
    default:
      return state;
  }
};

export default EditorReducer;