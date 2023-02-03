import axios from 'axios';

import {
  getAuthTokenFromStorage,
  getUserIdFromStorage,
  removeAuthTokenFromStorage,
  removeUserIdFromStorage,
  setAuthTokenInStorage,
  setUserIdInStorage,
} from './utils.js';

const SUBROUTE = 'user';

/**
 * @description logs the user in and sets the local auth token
 * @param {String} email user email
 * @param {String} password user password (plain text)
 * @returns {Promise<Object>} API response
 */
export const UserServicesLogin = async (email, password) => {
  const url = `http://localhost:8000/api/user/signin`;

  try {
    const { data } = await axios.post(url, {
      email,
      password,
    },
    );

    if (data) {
      setAuthTokenInStorage(data.token);
      setUserIdInStorage(data.user);
    }
    return data.user;
  } catch (error) {
    throw error;
  }
};

/**
 * @description signs user up with account
 * @param {String} email user email
 * @param {String} password user password (plain text)
 * @param {String} username user username
 * @returns {Promise<Object>} API response
 */
export const UserServicesSignUp = async (email, password, username) => {
  const url = `http://localhost:8000/api/user/signup`;
  const token = getAuthTokenFromStorage();

  console.log("user services sign up")
  try {
    const { data } = await axios.post(url, {
      email,
      password,
      username,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (data) {
      return data.user
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @description signs user out (clears storage token)
 */
export const UserServicesSignOut = () => {
  removeAuthTokenFromStorage();
  removeUserIdFromStorage();
};

/**
 * @description retrieves user info
 * @param {String} id user id
 * @returns {Promise<Object>} API response
 */
export const getUser = async (id) => {
  const url = `http://localhost:8000/api/user/${id}`;
  const token = getAuthTokenFromStorage();

  try {
    const { data: response } = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @description retrieves user info
 * @returns {Promise<Object>} API response
 */
export const getUSUserFromStorage = async () => {
  const id = getUserIdFromStorage();
  const token = getAuthTokenFromStorage();

  if (!id || !token) throw new Error('Missing user id or user token');

  const url = `http://localhost:8000/api/user/${id}`;

  try {
    const { data: response } = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @description updates user info
 * @param {String} id user id
 * @param {Object} fields fields to update
 * @returns {Promise<Object>} API response
 */
export const updateUser = async (id, fields) => {
  const url = `http://localhost:8000/api/user/${id}`;
  const token = getAuthTokenFromStorage();

  try {
    const { data: response } = await axios.put(url, fields, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @description retrieves all user info
 * @returns {Promise<Object>} API response
 */
export const getAllUsers = async () => {
  const url = `http://localhost:8000/api/user`;
  const token = getAuthTokenFromStorage();

  try {
    const { data: response } = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
