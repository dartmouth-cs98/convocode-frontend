export const ActionTypes = {
    ADD_JAVASCRIPT_CODE: 'ADD_JAVASCRIPT_CODE',
    INSERT_JAVASCRIPT_CODE: 'INSERT_JAVASCRIPT_CODE',
    ADD_HTML_CODE: 'ADD_HTML_CODE',
    INSERT_HTML_CODE: 'INSERT_HTML_CODE',
    ADD_CSS_CODE: 'ADD_CSS_CODE',
    INSERT_CSS_CODE: 'INSERT_CSS_CODE',
    ADD_PROJECT_ID: 'ADD_PROJECT_ID',
    ADD_PROJECT_TITLE: 'ADD_PROJECT_TITLE',
    INSERT_CODE_TAG: 'INSERT_CODE_TAG',
    REPLACE_CODE_TAG: 'REPLACE_CODE_TAG',
    APPEND_CODE_TAG: 'APPEND_CODE_TAG'
  };
  
  /**
   * @description update the code string
   */
  export const addJavascriptCode = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_JAVASCRIPT_CODE, payload: input });
    };
  };
  
  
  /**
   * @description append new input to code string from axios
   */
  export const insertJavascriptCode = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.INSERT_JAVASCRIPT_CODE, payload: input });
    };
  };
  
  /**
   * @description update the code string
   */
  export const addHTMLCode = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_HTML_CODE, payload: input });
    };
  };
  
  
  /**
   * @description append new input to code string from axios
   */
  export const insertHTMLCode = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.INSERT_HTML_CODE, payload: input });
    };
  };
  
  /**
   * @description update the code string
   */
  export const addCSSCode = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_CSS_CODE, payload: input });
    };
  };
  
  /**
   * @description append new input to code string from axios
   */
  export const insertCSSCode = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.INSERT_CSS_CODE, payload: input });
    };
  };

  /**
   * @description update the project id
   */
  export const addProjectId = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_PROJECT_ID, payload: input });
    };
  };

  /**
   * @description add project title
   */
  export const addProjectTitle = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_PROJECT_TITLE, payload: input });
    };
  };

  /**
  * @description add output regex string key and input string value 
  */
 export const insertCodeTag = (input) => {
   return (dispatch) => {
     dispatch({ type: ActionTypes.INSERT_CODE_TAG, payload: { query: input.query, index: input.index }});
   };
 };

 export const replaceCodeTag = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.REPLACE_CODE_TAG, payload : { query: input.query, index: input.index }});
  };
 };

 export const appendCodeTag = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.APPEND_CODE_TAG, payload : { query: input.query, index: input.index }});
  };
 };

