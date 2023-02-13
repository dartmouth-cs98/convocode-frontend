import { ActionTypes } from '../actions';

const projectState = {
  title: "",
  description: "",
  tags: "",
  javaCode: "",
  htmlCode: "",
  cssCode: "",
  status: Boolean,
  likes: Number,
  username: "",
  comments: [""],
  id: "",
};

const ProjectReducer = (state = projectState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PROJECT:
      return {
        javaCode: action.payload.javaCode,
        htmlCode: action.payload.htmlCode,
        cssCode: action.payload.cssCode,
        id: action.payload._id,
        title: action.payload.title,
        description: action.payload.description,
        tags: action.payload.tags,
        ...action.payload,
      };
    case ActionTypes.CREATE_PROJECT:
      return {
        javaCode: action.payload.javaCode,
        htmlCode: action.payload.htmlCode,
        cssCode: action.payload.cssCode,
        id: action.payload._id,
        title: action.payload.title,
        tags: action.payload.tags,
      };
    case ActionTypes.ADD_JAVASCRIPT_CODE:
      return { ...state, javaCode: action.payload };
    case ActionTypes.INSERT_JAVASCRIPT_CODE:
      return { ...state, javaCode: state.javaCode + action.payload };
    case ActionTypes.ADD_HTML_CODE:
      return { ...state, htmlCode: action.payload };
    case ActionTypes.INSERT_HTML_CODE:
      return { ...state, htmlCode: state.htmlCode + action.payload };
    case ActionTypes.ADD_CSS_CODE:
      return { ...state, cssCode: action.payload };
    case ActionTypes.INSERT_CSS_CODE:
      return { ...state, cssCode: state.cssCode + action.payload };
    case ActionTypes.ADD_PROJECT_ID:
      return { ...state, id: action.payload };
    case ActionTypes.ADD_PROJECT_TITLE:
      return { ...state, title: action.payload };
    case ActionTypes.ADD_PROJECT_DESCRIPTION:
      return { ...state, description: action.payload };
    case ActionTypes.ADD_PROJECT_TAG:
      return { ...state, tags: action.payload };
    case ActionTypes.ADD_PROJECT_STATUS:
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default ProjectReducer;