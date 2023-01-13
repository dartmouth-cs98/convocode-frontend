export const ActionTypes = {
    ADD_CSS_CODE: 'ADD_CSS_CODE',
    INSERT_CSS_CODE: 'INSERT_CSS_CODE',
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