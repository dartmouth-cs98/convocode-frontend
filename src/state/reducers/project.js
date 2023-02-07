import { ActionTypes } from '../actions';

const projectState = {
  javascript: "",
  html: "",
  css: "",
  projectId: "",
  projectTitle: "",
  projectDescription: "",
  projectTag: "",
  comments: [],
};

const ProjectReducer = (state = projectState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PROJECT:
      return {
        javascript: action.payload.javaCode,
        html: action.payload.htmlCode,
        css: action.payload.cssCode,
        projectId: action.payload._id,
        projectTitle: action.payload.title,
        projectDescription: action.payload.description,
        projectTag: action.payload.tags,
        ...action.payload,
      };
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
    case ActionTypes.ADD_PROJECT_DESCRIPTION:
      return { ...state, projectDescription: action.payload };
    case ActionTypes.ADD_PROJECT_TAG:
      return { ...state, projectTag: action.payload };

    default:
      return state;
  }
};

export default ProjectReducer;