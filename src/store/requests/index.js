import axios from 'axios';
import { BACKEND_URL, requestTimeout } from '../../utils/constants';

export const createBackendAxiosRequest = async (config) => axios({
  baseURL: `${BACKEND_URL}`,
  timeout: requestTimeout,
  withCredentials: true,
  ...config
});
