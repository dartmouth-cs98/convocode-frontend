export const ActionTypes = {
    ADD_JAVASCRIPT_CODE: 'ADD_JAVASCRIPT_CODE',
    INSERT_JAVASCRIPT_CODE: 'INSERT_JAVASCRIPT_CODE',
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