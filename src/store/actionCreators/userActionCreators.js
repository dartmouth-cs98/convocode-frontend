import { createAsyncActionCreator } from '.';
import ActionTypes from '../../utils/store';

import * as userRequests from '../requests/userRequests';

/**
 * Creates a user with the passed fields
 * @param {string} firstName - first name of user
 * @param {string} lastName - last name of user
 * @param {string} email - email address of user
 * @param {string} password - password of user
 * @param {object} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export const createUser = (firstName, lastName, email, password, config = {}) => (dispatch) => createAsyncActionCreator(
  dispatch, ActionTypes.FETCH_USER,
  () => userRequests.createUserRequest(firstName, lastName, email, password),
  config
);

/**
 * Fetches user with passed id
 * @param {string} id - id of user to fetch
 * @param {object} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export const fetchUserById = (id, config = {}) => (dispatch) => {
  if (!id) return dispatch({ type: `${ActionTypes.FETCH_USER}_SUCCESS`, payload: {} });

  return createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_USER,
    () => userRequests.fetchUserByIdRequest(id),
    config
  );
};

/**
 * Updates user with passed id
 * @param {string} id - id of user to update
 * @param {object} fields - key-value pairs of updates to make
 * @param {*} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export const updateUserById = (id, fields, config = {}) => (dispatch) => createAsyncActionCreator(
  dispatch, ActionTypes.FETCH_USER,
  () => userRequests.updateUserByIdRequest(id, fields),
  config
);

/**
 * Deletes user with passed id
 * @param {string} id - id of user to delete
 * @param {object} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export const deleteUserById = (id, config = {}) => (dispatch) => createAsyncActionCreator(
  dispatch, ActionTypes.DELETE_USER,
  () => userRequests.deleteUserByIdRequest(id),
  { additionalPayloadFields: { id }, },
  config
);

/**
 * Fetches all users in the database
 * @param {object} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export const fetchAllUsers = (config = {}) => (dispatch) => createAsyncActionCreator(
  dispatch, ActionTypes.FETCH_USERS,
  () => userRequests.fetchAllUsersRequest(),
  config
);
