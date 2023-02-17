import axios from 'axios';
import { getAuthTokenFromStorage } from './utils.js';

const SUBROUTE = 'project';
const SUBROUTE_COMMENT = 'comment';

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
 * @description loads searched projects from backend
 * @returns {Promise<Object>} API response
 */
export const searchProjects = async (searchString) => {
  console.log(searchString);
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}/search`;
  try {
    const config = {
      params: {
        searchString: searchString
      }
    };
   
    const { data } = await axios.get(url,config);
    
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
 * @description loads the comments on a project from the backend
 * @param id project id
 * @returns {Promise<Object>} API response
 */
export const getComments = async (id) => {
  const requestUrl = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE_COMMENT}/${id}`;

  try {

    // send request to db for project comments
    const { data } = await axios.get(requestUrl, { projectId: id })
    return data;
  } catch (error) {
    throw error;
  }
};

export const commentOnProject = async (projectId, username, commentBody) => {

  const commentInfo = {
    username: username,
    commentBody, commentBody
  }

  const requestUrl = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE_COMMENT}/${projectId}`;
    // request to create comment

    const { data } = await axios.post(requestUrl, { commentInfo });
    return data;

  }

export const commentOnComment = async (projectId, commentId, username, commentBody) => {

  const commentInfo = {
    commentId: commentId,
    username: username,
    commentBody, commentBody
  }

  const requestUrl = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE_COMMENT}/${projectId}`;

  const { data } = await axios.post(requestUrl, { commentInfo });
  
  return data;

  }

/**
 * @description loads user authored projects from the db
 * @param id user id
 * @returns {Promise<Object>} API response
 */
export const getUserProjects = async () => {

  console.log("now in projects services")
  const userToken = getAuthTokenFromStorage();
  console.log("do we have auth token yet");
  console.log(userToken)

  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}/userprojects`;

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

  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}/likedprojects`;

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

/**
 * @description increments like count of a project
 * @param id project id
 * @returns {Promise<Object>} API response
 */
export const likeProject = async (id) => {
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}/like/${id}`;

  try {
    const { data } = await axios.put(url);
    return data;
  } catch (error) {
    throw error;
  }
};


/**
 * @description creates a project 
 * @param projectInfo new project data fields
 * @returns {Promise<Object>} API response
 */
export const createNewProject = async (projectInfo) => {
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}`;
  const userToken = getAuthTokenFromStorage();
  console.log("axois post project", userToken)

  try {
    const { data } = await axios.post(url, projectInfo, {
      headers: {
        authorization: userToken
      },
    });

    console.log("proj servce", data)

    return data;
  } catch (error) {
    throw error;
  }
};