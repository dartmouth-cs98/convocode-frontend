export const ActionTypes = {
  TOGGLE_VIEW_MODE: 'TOGGLE_VIEW_MODE',
  UPDATE_FONT_SIZE: 'UPDATE_FONT_SIZE',
};

/**
 * @description toggle view mode between light and dark 
 */
export const toggleViewMode = () => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.TOGGLE_VIEW_MODE, payload: {} });
  };
};


/**
 * @description select a new font size for code editor
 */
export const updateFontSize = (size) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_FONT_SIZE, payload: size });
  };
};
