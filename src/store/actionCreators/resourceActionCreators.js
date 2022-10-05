import { createAsyncActionCreator } from '.';
import ActionTypes from '../../utils/store';

import * as resourceRequests from '../requests/resourceRequests';

/**
 * Creates a new resource
 * @param {string} title - title of resource to create
 * @param {string} description - description of resource to create
 * @param {number} value - value of resource to create
 * @param {object} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export function createResource(title, description, value, config = {}) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_RESOURCE,
    () => resourceRequests.createResourceRequest(title, description, value),
    config
  );
}

/**
 * Fetches resource with passed id
 * @param {string} id - id of resource to fetch
 * @param {object} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export function fetchResourceById(id, config = {}) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_RESOURCE,
    () => resourceRequests.fetchResourceByIdRequest(id),
    config
  );
}

/**
 * Updates resource with passed id
 * @param {string} id - id of resource to update
 * @param {object} fields - key-value pairs of updates to make
 * @param {object} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export function updateResourceById(id, fields, config = {}) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_RESOURCE,
    () => resourceRequests.updateResourceByIdRequest(id, fields),
    config
  );
}

/**
 * Deletes resource with passed id
 * @param {string} id - id of resource to delete
 * @param {object} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export function deleteResourceById(id, config = {}) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.DELETE_RESOURCE,
    () => resourceRequests.deleteResourceByIdRequest(id),
    { additionalPayloadFields: { id }, ...config },
  );
}

/**
 * Fetches all resources in the database
 * @param {object} config - additional createAsyncActionCreator configuration
 * @returns thunk result
 */
export const fetchAllResources = (config = {}) => (dispatch) => createAsyncActionCreator(
  dispatch, ActionTypes.FETCH_RESOURCES,
  () => resourceRequests.fetchAllResourcesRequest(),
  config
);
