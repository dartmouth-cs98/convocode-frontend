import { UserServicesLogin, UserServicesSignOut, getUSUserFromStorage, UserServicesSignUp } from "../../services/user.js"
import { getLikedProjects, getUserProjects } from "../../services/projects.js";

export const ActionTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  SET_AUTHORED_PROJECTS: 'SET_AUTHORED_PROJECTS',
  SET_LIKED_PROJECTS: 'SET_LIKED_PROJECTS',
  CLEAR_USER_DATA: 'CLEAR_USER_DATA',
  CLEAR_PROFILE_DATA: 'CLEAR_PROFILE_DATA',
  API_ERROR: 'API_ERROR',
  ONBOARDED: 'ONBOARDED'

};

/**
 * @description action creator for logging user in
 * @param {String} email user email
 * @param {String} password user password (plain text)
 * @param {Function} [onSuccess = () => {}] callback for when request is successful
 * @param {Function} [onError = () => {}] callback for when request fails
 */
export const login = (email, password, onSuccess = () => { }, onError = () => { }) => {
  return async (dispatch) => {
    try {
      const data = await UserServicesLogin(email, password);
      console.log("got user data!")
      console.log(data);
      if (data) {
        dispatch({ type: ActionTypes.SET_USER_DATA, payload: data });
      }

      // get authored projects from backend
      const authoredProjects = await getUserProjects();

      if (authoredProjects) {
        dispatch({ type: ActionTypes.SET_AUTHORED_PROJECTS, payload: authoredProjects });
      }

      // get authored projects from backend
      const likedProjects = await getLikedProjects();

      if (likedProjects) {
        dispatch({ type: ActionTypes.SET_LIKED_PROJECTS, payload: likedProjects });
      }

      onSuccess();
    } catch (error) {
      console.log(error)
      dispatch({
        type: ActionTypes.API_ERROR,
        payload: {
          action: 'LOGIN',
          error,
        },
      });
      onError(error);
    }
  };
};

/**
 * @description action creator for logging user in after creating an account
 * @param {String} email user email
 * @param {String} password user password (plain text)
 * @param {String} username username
 * @param {Function} [onSuccess = () => {}] callback for when request is successful
 * @param {Function} [onError = () => {}] callback for when request fails
 */
export const signup = (email, password, username, onSuccess = () => { }, onError = () => { }) => {
  return async (dispatch) => {
    try {
      const data = await UserServicesSignUp(email, password, username);
      if (data) {
        console.log("user data on signup")
        console.log(data)
        dispatch({ type: ActionTypes.SET_USER_DATA, payload: data });
      }
      onSuccess();
    } catch (error) {
      console.log(error)
      dispatch({
        type: ActionTypes.API_ERROR,
        payload: {
          action: 'SIGNUP',
          error,
        },
      });
      onError(error);
    }
  };
};

/**
 * @description action creator for logging user in from local storage
 */
export const getUserFromStorage = () => {
  return async (dispatch) => {
    try {
      console.log("getting from storage")
      const response = await getUSUserFromStorage();
      dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });
    } catch (error) {
      dispatch({
        type: ActionTypes.API_ERROR,
        payload: {
          action: 'LOGIN FROM STORAGE',
          error,
        },
      });
    }
  };
};

/**
 * @description action creator for signing user out
 */
export const signOut = () => {
  return (dispatch) => {
    UserServicesSignOut();
    dispatch({ type: ActionTypes.CLEAR_USER_DATA, payload: {} });
    dispatch({ type: ActionTypes.CLEAR_PROFILE_DATA, payload: {} });
  };
};

/**
 * @description action for setting onboarded as false after runing through process
 */
export const onboarding  = ()  => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.ONBOARDED, payload: false });
  }
}