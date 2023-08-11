import axios from 'axios';

const SUBROUTE = 'openAI';

/**
 * @description retrieves openAI code from convodex
 * @param queryType specifies the code and language of the query
 * @returns {Promise<Object>} API response
 */
export const getOpenAICode = async (query, codeType, css, js, html) => {
  const url = `${process.env.REACT_APP_ROOT_URL}/${SUBROUTE}`;

  try {
    const { data } = await axios.post(url, { userInput: query, codeType, cssCode: css, javaCode: js, htmlCode: html});
    return data;
  } catch (error) {
    throw error;
  }
};