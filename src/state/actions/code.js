export const ActionTypes = {
  ADD_CODE: 'ADD_CODE',
  INSERT_CODE: 'INSERT_CODE',
};

/**
 * @description update the code string
 */
export const addCode = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_CODE, payload: input });
  };
};


/**
 * @description append new input to code string from axios
 */
export const insertCode = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.INSERT_CODE, payload: input });
  };
};