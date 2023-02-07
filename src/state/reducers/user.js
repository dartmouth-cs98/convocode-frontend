import { ActionTypes } from '../actions';

const initialState = {
  username: "",
  email: "",
  projects: [],
  likes: [],
  lightMode: true,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return { ...state, ...action.payload };
    case ActionTypes.CLEAR_USER_DATA:
      return { ...initialState };
    default:
      return state;
  }
};

export default UserReducer;