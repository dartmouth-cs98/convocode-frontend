export const ActionTypes = {
    SET_DISPLAY_STATE: 'SET_DISPLAY_STATE'
};

/**
 * @description clears project data
 */
 export const setDisplay = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SET_DISPLAY_STATE, payload: input });
    };
  };