export const ActionTypes = {
    SET_QUERY: 'SET_QUERY'
};

  /**
 * @description update the query
 */
export const setQuery = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SET_QUERY, payload: input });
    };
  };