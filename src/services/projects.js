import axios from 'axios';

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