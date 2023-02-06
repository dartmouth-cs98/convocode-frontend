export const ActionTypes = {
    ADD_JAVASCRIPT_CODE: 'ADD_JAVASCRIPT_CODE',
    INSERT_JAVASCRIPT_CODE: 'INSERT_JAVASCRIPT_CODE',
    ADD_HTML_CODE: 'ADD_HTML_CODE',
    INSERT_HTML_CODE: 'INSERT_HTML_CODE',
    ADD_CSS_CODE: 'ADD_CSS_CODE',
    INSERT_CSS_CODE: 'INSERT_CSS_CODE',
    ADD_PROJECT_ID: 'ADD_PROJECT_ID',
    ADD_PROJECT_TITLE: 'ADD_PROJECT_TITLE',
    ADD_PROJECT_DESCRIPTION: 'ADD_PROJECT_DESCRIPTION',
    ADD_PROJECT_TAG: 'ADD_PROJECT_TAG',
    ADD_CLEANED_CODE: 'ADD_CLEANED_CODE'

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
   * @description add project description
   */
   export const addProjectDescription = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_PROJECT_DESCRIPTION, payload: input });
    };
  };

   /**
   * @description add project tag
   */
    export const addProjectTag = (input) => {
      return (dispatch) => {
        dispatch({ type: ActionTypes.ADD_PROJECT_TAG, payload: input });
      };
    };

    export const addCleanedJavascript = (input) => {
      return (dispatch) => {
        dispatch({ type: ActionTypes.ADD_CLEANED_CODE, payload: input});
      }
    }
