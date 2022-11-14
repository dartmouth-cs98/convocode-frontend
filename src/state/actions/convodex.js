export const ActionTypes = {
  ADD_ENTRY: 'ADD_ENTRY',
};

export function addConvodexEntry(entry) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_ENTRY, payload: entry });
  };
}