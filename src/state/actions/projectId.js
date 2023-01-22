export const ActionTypes = {
    ADD_PROJECT_ID: 'ADD_PROJECT_ID',
  };
  
  /**
   * @description update the project id
   */
  export const addProjectId = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_PROJECT_ID, payload: input });
    };
  };
  
  
  // /**
  //  * @description append new input to code string from axios
  //  */
  // export const insertJavascriptCode = (input) => {
  //   return (dispatch) => {
  //     dispatch({ type: ActionTypes.INSERT_JAVASCRIPT_CODE, payload: input });
  //   };
  // };