export const ActionTypes = {
    FILE_NAME: 'FILE_NAME',
  };
  
export function createFileName(name) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.FILE_NAME, payload: name});
    };
  }