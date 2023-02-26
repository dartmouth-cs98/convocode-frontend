export const ActionTypes = {
    SET_JAVA_EDITOR: 'SET_JAVA_EDITOR',
    SET_CSS_EDITOR: 'SET_CSS_EDITOR',
    SET_HTML_EDITOR: 'SET_HTML_EDITOR',
    SET_MONACO_REF: 'SET_MONACO_EDITOR',
};

/**
 * @description set JS editor
 */
 export const setJavaEditor = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SET_JAVA_EDITOR, payload: input });
    };
  };

  /**
 * @description set Html editor
 */
 export const setHtmlEditor = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SET_HTML_EDITOR, payload: input });
    };
  };

  /**
 * @description set Css editor
 */
 export const setCssEditor = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SET_CSS_EDITOR, payload: input });
    };
  };

  /**
 * @description set Monaco reference
 */
 export const setMonaco = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SET_MONACO_REF, payload: input });
    };
  };