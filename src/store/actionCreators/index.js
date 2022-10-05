import axios from 'axios';
/**
* Generates valid "success" payload given a response object and additional custom parameters
* * Note: Use this whenever not using `createAsyncActionCreator` to correctly interface with reducers
* @param {*} response - Axios Response
* @param {*} additionalPayloadFields - additional key-value pairs to attach to the created payload
*/
export const generateSuccessPayload = (response, additionalPayloadFields = {}) => ({
  data: { ...response.data.data, ...additionalPayloadFields },
  code: response.status || null
});

/**
 * A function which standardizes the creation of asynchronous action creators. This allows for standardization in the creation and maintenance of reducers.
 * * Note: This function is intended to reduce boilerplate code. If additional customization is needed, see `generateSuccessPayload` and `generateFailurePayload`
 * @param {*} dispatch - Redux dispatch function
 * @param {*} actionName - Name of action to manage (e.g. ActionTypes.FETCH_USER)
 * @param {*} axiosConfig - Standard axios configuration object (https://github.com/axios/axios#request-config)
 * @param {*} config - Config object containing additional configuration fields
 *
 * Optional `config` fields:
 * * `successCallback` - Function called on success of request (passed request object)
 * * `failureCallback` - Function called on failure of request (passed error object)
 * * `additionalPayloadFields` - Additional fields to include on top level of success action payload (e.g. object id for deleting resource)
 * * `responseSubfield` - Loads `response.data[subfield]` into success payload instead of `response.data`
 */
export const createAsyncActionCreator = async (
  dispatch, type, axiosFetchCallback, config = {}
) => {
  try {
    dispatch({ type, status: 'REQUEST', payload: { data: {} } });
    const response = await axiosFetchCallback();

    dispatch({
      type,
      status: 'SUCCESS',
      payload: generateSuccessPayload(response, config.additionalPayloadFields)
    });

    if (config.successCallback) { config.successCallback(response, dispatch); }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch({
        type,
        payload: {
          message: error.message,
          code: error.response?.status || error.code || error.name || null
        }
      });
    } else {
      dispatch({
        type,
        payload: {
          message: error.message,
          code: error.name || null
        }
      });
    }

    if (config.failureCallback) config.failureCallback(error, dispatch);
  }
};

export default createAsyncActionCreator;
