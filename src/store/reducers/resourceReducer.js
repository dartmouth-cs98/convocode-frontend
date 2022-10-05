import omit from 'lodash.omit';
import ActionTypes from '../../utils/store';

const initialState = {
  resources: {},
  results: [],
  numResults: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.SEARCH}_SUCCESS`: // Saves results and total number of results available (before pagination, from server)
      return { ...state, results: action.payload.data.results, numResults: action.payload.data.numResults };
    case `${ActionTypes.FETCH_RESOURCE}_SUCCESS`: // Load resource into { id: element } mapping
      return { ...state, resources: { ...state.resources, [action.payload.data._id]: action.payload.data } };
    case `${ActionTypes.FETCH_RESOURCES}_SUCCESS`: // Load resources into { id: element } mapping
      return { ...state, resources: { ...state.resources, ...action.payload.data.reduce((accum, e) => ({ ...accum, [e._id]: e }), {}) } };
    case `${ActionTypes.DELETE_RESOURCE}_SUCCESS`: // Delete resource from state
      return { ...state, resources: omit(state.resources, action.payload.id) };
    default:
      return state;
  }
};

export default reducer;
