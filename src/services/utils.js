const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'CONVOCODE_AUTH_TOKEN',
  USER_ID: 'CONVOCODE_AUTH_USER_ID',
};

/**
 * @description retrieves key from local storage
 * @returns {String} value in local storage
 */
const getLocal = (key) => () => localStorage.getItem(key);

/**
 * @description sets key in local storage
 */
const setLocal = (key) => (value) => localStorage.setItem(key, value);

/**
 * @description removes key from local storage
 * @returns {String} value in local storage
 */
const removeLocal = (key) => () => localStorage.removeItem(key);

/**
 * @description retrieves user auth token from local storage
 * @returns {String} auth token
 */
export const getAuthTokenFromStorage = getLocal(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

/**
 * @description sets auth token in local storage
 * @param {String} authToken auth token to set
 */
export const setAuthTokenInStorage = setLocal(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

/**
 * @description removes user auth token from local storage
 * @returns {String} auth token
 */
export const removeAuthTokenFromStorage = removeLocal(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

/**
 * @description retrieves user id from local storage
 * @returns {String} user id
 */
export const getUserIdFromStorage = getLocal(LOCAL_STORAGE_KEYS.USER_ID);

/**
 * @description sets user id in local storage
 * @param {String} userId user id to set
 */
export const setUserIdInStorage = setLocal(LOCAL_STORAGE_KEYS.USER_ID);

/**
 * @description removes user id from local storage
 * @returns {String} user id
 */
export const removeUserIdFromStorage = removeLocal(LOCAL_STORAGE_KEYS.USER_ID);
