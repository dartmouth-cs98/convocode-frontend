import axios from 'axios';

const SUBROUTE = 'getCode';

/**
 * @description retrieves openAI code from convodex
 * @param queryType specifies the code and language of the query
 * @returns {Promise<Object>} API response
 */
export const getOpenAICode = async (queryType) => {
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}`;

  try {
    const { data } = await axios.post(url, { userInput: queryType });
    return data;
  } catch (error) {
    throw error;
  }
};