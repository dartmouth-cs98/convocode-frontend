import omit from 'lodash.omit';
import ActionTypes from '../../utils/store';

const initialState = {
  authenticated: false,
  users: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_USER}_SUCCESS`: // Load user into { id: element } mapping
      return { ...state, users: { ...state.users, [action.payload.data._id]: action.payload.data } };
    case `${ActionTypes.FETCH_USERS}_SUCCESS`: // Load users into { id: element } mapping
      return { ...state, users: { ...state.users, ...action.payload.data.reduce((accum, e) => ({ ...accum, [e._id]: e }), {}) } };
    case `${ActionTypes.DELETE_USER}_SUCCESS`: // Delete user from state
      return { ...state, users: omit(state.users, action.payload.id) };

    case `${ActionTypes.AUTH_USER}_SUCCESS`: // Update users if action provides user data
      return { ...state, authenticated: true, users: action.payload.data ? { ...state.users, [action.payload.data._id]: action.payload.data } : state.users };
    case `${ActionTypes.DEAUTH_USER}_SUCCESS`:
      return { ...state, authenticated: false, users: {} };
    default:
      return state;
  }
};

export default reducer;
