import { ActionTypes } from '../actions';

const initialState = {
  username: "",
  email: "",
  authoredProjects: [],
  likedProjects: [],
  lightMode: true,
  projectCount: 0,
  likeCount: 0,
  status: "",
  onboarded: true,
  error: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return { ...state, ...action.payload };
    case ActionTypes.SET_AUTHORED_PROJECTS:
      return { ...state, authoredProjects: action.payload };
    case ActionTypes.SET_LIKED_PROJECTS:
      return { ...state, likedProjects: action.payload };
    case ActionTypes.CLEAR_USER_DATA:
      return { ...initialState };
    case ActionTypes.ONBOARDED:
      return { ...state, onboarded: action.payload }
    case ActionTypes.SET_USER_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.CLEAR_USER_ERROR:
      return { ...state, error: {} }
    default:
      return state;
  }
};

export default UserReducer;