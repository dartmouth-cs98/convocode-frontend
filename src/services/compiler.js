import axios from 'axios';

const SUBROUTE = 'compiler';

/**
 * @description retrieves compiler output
 * @param code code string to compile
 * @returns {Promise<Object>} API response
 */
export const compileCode = async (code) => {
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}`;

  try {
    const { data } = await axios.post(url, { source_code: code });
    return data;
  } catch (error) {
    throw error;
  }
};