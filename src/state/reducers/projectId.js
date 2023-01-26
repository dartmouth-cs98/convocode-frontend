import { ActionTypes } from '../actions';

const initialState = {
  string: "",
};

const ProjectIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PROJECT_ID:
      return { ...state, string: action.payload };
    // case ActionTypes.INSERT_JAVASCRIPT_CODE:
    //   return { ...state, string: state.string + action.payload };
    default:
      return state;
  }
};

export default ProjectIdReducer;