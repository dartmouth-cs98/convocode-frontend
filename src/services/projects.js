import axios from 'axios';
//import { getUser } from 'user'
import { getAuthTokenFromStorage } from './utils.js';

const SUBROUTE = 'project';

/**
 * @description loads projects from backend
 * @returns {Promise<Object>} API response
 */
export const getAllProjects = async () => {
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw error;
  }
};


/**
 * @description loads a project from backend
 * @param id project id
 * @returns {Promise<Object>} API response
 */
export const getProject = async (id) => {
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}/${id}`;

  try {
    const { data } = await axios.get(url);
    // format data for redux 

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description loads user authored projects from the db
 * @param id user id
 * @returns {Promise<Object>} API response
 */
export const getUserProjects = async () => {

  console.log("now in projects services")
  const userToken = getAuthTokenFromStorage();
  console.log(userToken)

  const url = `http://localhost:8000/api/project/userprojects`;

  try {
    console.log('trying to get all user projects!');

    const { data } = await axios.get(url, {
      headers: {
        authorization: userToken
      },
    });

    console.log("back from getUserProjects request")
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @description loads user authored projects from the db
 * @returns {Promise<Object>} API response
 */
export const getLikedProjects = async () => {

  console.log("now in projects services")
  const userToken = getAuthTokenFromStorage();
  console.log(userToken)

  const url = `http://localhost:8000/api/project/likedprojects`;

  try {
    console.log('trying to get all liked projects!');

    const { data } = await axios.get(url, {
      headers: {
        authorization: userToken
      },
    });

    console.log("back from getLikedProjects request")
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};