export const ActionTypes = {
    ADD_HTML_CODE: 'ADD_HTML_CODE',
    INSERT_HTML_CODE: 'INSERT_HTML_CODE',
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