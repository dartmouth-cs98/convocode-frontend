
import { UserServicesLogin, UserServicesSignOut, getUSUserFromStorage, UserServicesSignUp, setOnboarding, getUser } from "../../services/user.js"

export const ActionTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  CLEAR_USER_DATA: 'CLEAR_USER_DATA',
  CLEAR_PROFILE_DATA: 'CLEAR_PROFILE_DATA',
  SET_USER_ERROR: 'SET_USER_ERROR',
  CLEAR_USER_ERROR: 'CLEAR_USER_ERROR',
  ONBOARDED: 'ONBOARDED',
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
      console.log('in login on frontend')
      const data = await UserServicesLogin(email, password);
      console.log("got user data!")
      console.log(data);
      if (data) {
        dispatch({ type: ActionTypes.SET_USER_DATA, payload: data });
      }
      
      // // get authored projects from backend
      // const authoredProjects = await getUserProjects();

      // if (authoredProjects) {
      //   dispatch({ type: ActionTypes.SET_AUTHORED_PROJECTS, payload: authoredProjects });
      // }

      // // get authored projects from backend
      // const likedProjects = await getLikedProjects();
      // console.log(likedProjects)

      // if (likedProjects) {
      //   dispatch({ type: ActionTypes.SET_LIKED_PROJECTS, payload: likedProjects });
      // }

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
    } catch (error) {
      console.log("error in actions", error)
      const e = {
        location: "Sign Up",
        data: error.response.data,
        status: error.response.status,
      }
      dispatch({ type: ActionTypes.SET_USER_ERROR, payload: e });
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
 * @description action creator for logging user in from local storage
 */
export const refreshUser = () => {
  return async (dispatch) => {
    try {

      const response = await getUser();
      dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });

    } catch (error) {
      dispatch({
        type: ActionTypes.API_ERROR,
        payload: {
          action: 'REFRESH USER',
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
export const onboarding = () => {
  return async (dispatch) => {
    setOnboarding();
    dispatch({ type: ActionTypes.ONBOARDED, payload: false });
  }
}

/**
 * @description clear api error
 */
export const clearUserError = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_USER_ERROR, payload: {} });
  }
}