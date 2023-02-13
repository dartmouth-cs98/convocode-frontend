import { ActionTypes } from '../actions';

const initialState = {
  projects: []
};

const CommunityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PROJECTS:
      return { ...state, projects: action.payload };
    default:
      return state;
  }
};

export default CommunityReducer;
