import { UserServicesLogin, UserServicesSignOut, getUSUserFromStorage, UserServicesSignUp } from "../../services/user.js"

export const ActionTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  API_ERROR: 'API_ERROR',
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
      if (data) {
        dispatch({ type: ActionTypes.SET_USER_DATA, payload: data });
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
    console.log("sign out")
    UserServicesSignOut();
    dispatch({ type: ActionTypes.SET_USER_DATA, payload: {} });
  };
};
