export const ActionTypes = {
    FILE_NAME_: 'TOGGLE_VIEW_MODE',
  };
  
export function setFileName(name) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.FETCH_MOMENT, payload: name});
    };
  }