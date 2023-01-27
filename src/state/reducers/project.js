import { ActionTypes } from '../actions';

const projectState = {
  javascript: "",
  html: "",
  css: "",
  projectId: ""
};

const ProjectReducer = (state = projectState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_JAVASCRIPT_CODE:
      return { ...state, javascript: action.payload };
    case ActionTypes.INSERT_JAVASCRIPT_CODE:
      return { ...state, javascript: state.javascript + action.payload };
    case ActionTypes.ADD_HTML_CODE:
      return { ...state, html: action.payload };
    case ActionTypes.INSERT_HTML_CODE:
      return { ...state, html: state.html + action.payload };
    case ActionTypes.ADD_CSS_CODE:
      return { ...state, css: action.payload };
    case ActionTypes.INSERT_CSS_CODE:
      return { ...state, css: state.css + action.payload };
    case ActionTypes.ADD_PROJECT_ID:
      return { ...state, projectId: action.payload };
    default:
      return state;
  }
};

export default ProjectReducer;