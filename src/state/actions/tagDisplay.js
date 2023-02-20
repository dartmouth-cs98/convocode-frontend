export const ActionTypes = {
    SET_JAVA_DISPLAY: 'SET_JAVA_DISPLAY_STATE',
    SET_CSS_DISPLAY: 'SET_CSS_DISPLAY',
    SET_HTML_DISPLAY: 'SET_HTML_DISPLAY'
};

/**
 * @description set JS display state
 */
 export const setJavaDisplay = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SET_JAVA_DISPLAY, payload: input });
    };
  };

  /**
 * @description set CSS display state
 */
 export const setCSSDisplay = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SET_CSS_DISPLAY, payload: input });
    };
  };

  /**
 * @description set HTML display state
 */
 export const setHTMLDisplay = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SET_HTML_DISPLAY, payload: input });
    };
  };