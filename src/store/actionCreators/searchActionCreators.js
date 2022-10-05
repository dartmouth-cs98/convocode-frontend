import { createAsyncActionCreator } from '.';
import ActionTypes from '../../utils/store';

import * as searchRequests from '../requests/searchRequests';

/**
 * A function that fetches data from server and stores it in redux
 * @param {*} query - Search string
 * @param {*} filters - Filters applied - UNIMPLEMENTED
 * @param {*} sort - 'a' -> ascending, 'd' -> descending
 * @param {*} page - Which page of results (calculated in backend) to display?
 * @param {*} numPerPage - How many results should the backend return per query?
 */
export function resourceSearch(query, filters, sort, page, numPerPage, config = {}) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.RESOURCE_SEARCH,
    () => searchRequests.resourceSearchRequest(query, filters, sort, page, numPerPage),
    config
  );
}
