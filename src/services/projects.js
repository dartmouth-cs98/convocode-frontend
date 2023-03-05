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

  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}/search`;
  try {
    const config = {
      params: {
        searchString: searchString
      }
    };

    const { data } = await axios.get(url, config);

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

export const commentOnProject = async (projectId, commentBody, replyingTo) => {

  const commentInfo = {
    commentBody: commentBody,
    replyingTo: replyingTo
  }

  const userToken = getAuthTokenFromStorage();

  const requestUrl = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE_COMMENT}/${projectId}`;
  // request to create comment

    const { data } = await axios.post(requestUrl, commentInfo, { headers: { authorization: userToken } });
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
 * @description increments like count of a project
 * @param id project id
 * @returns {Promise<Object>} API response
 */
export const likeServiceProject = async (id) => {
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}/like/${id}`;
  const userToken = getAuthTokenFromStorage();


  try {
    const { data } = await axios.put(url, {}, {
      headers: {
        authorization: userToken
      },
    });


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


  try {
    const { data } = await axios.post(url, projectInfo, {
      headers: {
        authorization: userToken
      },
    });

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
 export const updateProject = async (projectInfo) => {
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}/${projectInfo.id}`;
  const userToken = getAuthTokenFromStorage();

  try {
    const { data } = await axios.put(url, projectInfo, {
      headers: {
        authorization: userToken
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description like a project
 * @param id project id to like
 */
export const deleteProject = async (projectId) => {

  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}/${projectId}`;
  const userToken = getAuthTokenFromStorage();
  console.log("are we in projet services")
  console.log(url)
  console.log(userToken)
  try {
    const { data } = await axios.delete(url, {}, {
      headers: {
        authorization: userToken
      },
    });

  } catch (error) {
    throw error;
  }
};