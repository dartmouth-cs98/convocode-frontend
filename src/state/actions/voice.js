export const ActionTypes = {
    ADD_SPEECH: 'ADD_SPEECH',
  };
  
  /**
   * @description toggle view mode between light and dark 
   */
   export const addSpeech = (input) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_SPEECH, payload: {input} });
    };
  };