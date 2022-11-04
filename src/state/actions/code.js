export const ActionTypes = {
    ADD_CODE: 'ADD_CODE',
  };
  
  /**
   * @description toggle view mode between light and dark 
   */
   export const addCode = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_CODE, payload: {input} });
    };
  };