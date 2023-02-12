import { ActionTypes } from '../actions';

const profileState = {
  authoredProjects: [],
  likedProjects: []
};

const ProfileReducer = (state = profileState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_USER_PROJECTS:
      return { ...state, authoredProjects: action.payload };
    case ActionTypes.LOAD_LIKED_PROJECTS:
      return { ...state, likedProjects: action.payload };
    default:
      return state;
  }
};

export default ProfileReducer;