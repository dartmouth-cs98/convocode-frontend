import { ActionTypes } from '../actions';

const projectState = {
  javascript: "",
  html: "",
  css: "",
  projectId: "",
  projectTitle: "",
  tags: {},
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
    case ActionTypes.ADD_PROJECT_TITLE:
      return { ...state, projectTitle: action.payload };
    case ActionTypes.ADD_CODE_TAG: 
      return {...state, tags: {
        ...state.tags, 
        [action.payload.codeOutput]: action.payload.codeInput
      }};
    default:
      return state;
  }
};

export default ProjectReducer;