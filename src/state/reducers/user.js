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
      console.log(action.payload)
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default UserReducer;