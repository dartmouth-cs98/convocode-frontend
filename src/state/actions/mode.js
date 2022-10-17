export const ActionTypes = {
  TOGGLE_VIEW_MODE: 'TOGGLE_VIEW_MODE',
};

/**
 * @description toggle view mode between light and dark 
 */
 export const toggleViewMode = () => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.TOGGLE_VIEW_MODE, payload: {} });
  };
};
