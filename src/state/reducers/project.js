import { ActionTypes } from '../actions';

const initialState = {
  title: "",
  description: "",
  tags: [""],
  javaCode: "",
  htmlCode: "",
  cssCode: "",
  cleanedCode: "",
  cleanedHtml: "",
  status: Boolean,
  likes: Number,
  username: "",
  comments: [""],
  commentObjects: [],
  id: "",
  javaCodeHistory: [{query: -1, code: [""], tags: [-1]}],
  cssCodeHistory: [{query: -1, code: [""], tags: [-1]}],
  htmlCodeHistory: [{query: -1, code: [""], tags: [-1]}],
  replyingTo: "",
  replyingUser: "",
};


function insertCodeHelper(index, newCode, oldCode) {
  const c = oldCode.split(/\r\n|\r|\n/);
  const l = newCode.split(/\r\n|\r|\n/);
  var idx = index;
  for (var i = 0; i < l.length; i++) {
    c.splice(idx, 0, l[i]);
    idx++;
  }
  return c.join('\n');
}

const ProjectReducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.LOAD_PROJECT:
      return {
        javaCode: action.payload.javaCode,
        htmlCode: action.payload.htmlCode,
        cssCode: action.payload.cssCode,
        cssCodeHistory: action.payload.cssCodeHistory,
        htmlCodeHistory: action.payload.htmlCodeHistory,
        javaCodeHistory: action.payload.javaCodeHistory,
        id: action.payload._id,
        title: action.payload.title,
        description: action.payload.description,
        tags: action.payload.tags,
        cleanedCode: action.payload.cleanedCode,
        cleanedHtml: action.payload.cleanedHtml,
        commentObjects: action.payload.commentObjects,
        ...action.payload,
      };
    case ActionTypes.CREATE_PROJECT:
      return {
        javaCode: action.payload.javaCode,
        htmlCode: action.payload.htmlCode,
        cssCode: action.payload.cssCode,
        cssCodeHistory: action.payload.cssCodeHistory,
        htmlCodeHistory: action.payload.htmlCodeHistory,
        javaCodeHistory: action.payload.javaCodeHistory,
        id: action.payload._id,
        title: action.payload.title,
        tags: action.payload.tags,
        cleanedCode: action.payload.cleanedCode,
        cleanedHtml: action.payload.cleanedHtml,
      };
    case ActionTypes.UPDATE_PROJECT:
      return {
        javaCode: action.payload.javaCode,
        htmlCode: action.payload.htmlCode,
        cssCode: action.payload.cssCode,
        cssCodeHistory: action.payload.cssCodeHistory,
        htmlCodeHistory: action.payload.htmlCodeHistory,
        javaCodeHistory: action.payload.javaCodeHistory,
        id: action.payload._id,
        title: action.payload.title,
        tags: action.payload.tags,
        cleanedCode: action.payload.cleanedCode,
      };
    case ActionTypes.ADD_JAVASCRIPT_CODE:
      return { ...state, javaCode: action.payload };
    case ActionTypes.INSERT_JAVASCRIPT_CODE:
      const newJS = insertCodeHelper(action.payload.index, action.payload.code, state.javaCode);
      return { ...state, javaCode: newJS };
    case ActionTypes.ADD_HTML_CODE:
      return { ...state, htmlCode: action.payload };
    case ActionTypes.INSERT_HTML_CODE:
      const newHTML = insertCodeHelper(action.payload.index, action.payload.code, state.htmlCode);
      return { ...state, htmlCode: newHTML };
    case ActionTypes.ADD_CSS_CODE:
      return { ...state, cssCode: action.payload };
    case ActionTypes.INSERT_CSS_CODE:
      const newCSS = insertCodeHelper(action.payload.index, action.payload.code, state.cssCode);
      return { ...state, cssCode: newCSS };
    case ActionTypes.ADD_PROJECT_ID:
      return { ...state, id: action.payload };
    case ActionTypes.ADD_PROJECT_TITLE:
      return { ...state, title: action.payload };
    case ActionTypes.ADD_PROJECT_DESCRIPTION:
      return { ...state, description: action.payload };
    case ActionTypes.ADD_PROJECT_TAG:
      return { ...state, tags: action.payload };
    case ActionTypes.DELETE_PROJECT_TAG:
      return { ...state, tags: action.payload };
    case ActionTypes.ADD_CLEANED_CODE:
      return { ...state, cleanedCode: action.payload };
    case ActionTypes.ADD_CLEANED_HTML:
      return { ...state, cleanedHtml: action.payload };
    case ActionTypes.ADD_PROJECT_STATUS:
      return { ...state, status: action.payload };
    case ActionTypes.ADD_COMMENTS:
      return { ...state, commentObjects: action.payload };
    case ActionTypes.SET_REPLYING_TO:
      return { ...state, replyingTo: action.payload };
    case ActionTypes.SET_REPLYING_USER:
      return { ...state, replyingUser: action.payload };
    case ActionTypes.LIKE_PROJECT:
      return { ...state, likes: action.payload };
    case ActionTypes.CLEAR_PROJECT_DATA:
      return { ...initialState };
    case ActionTypes.ADD_JAVA_CODE_HISTORY:
      return {...state, javaCodeHistory: [...state.javaCodeHistory, {query: action.payload.query, code: action.payload.updatedCode, tags: action.payload.tags}]};
    case ActionTypes.ADD_CSS_CODE_HISTORY:
      return {...state, cssCodeHistory: [...state.cssCodeHistory, {query: action.payload.query, code: action.payload.updatedCode, tags: action.payload.tags}]};
    case ActionTypes.ADD_HTML_CODE_HISTORY:
      return {...state, htmlCodeHistory: [...state.htmlCodeHistory, {query: action.payload.query, code: action.payload.updatedCode, tags: action.payload.tags}]};
    default:
      return state;
  }
};

export default ProjectReducer;