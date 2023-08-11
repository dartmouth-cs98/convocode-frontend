import { ActionTypes } from '../actions';

const initialState = {
  projects: [],
  currentPage: 1,
  totalPages: 1,
  searchString: ""
};

const CommunityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PROJECTS:
      return { ...state, projects: action.payload };
    case ActionTypes.UPDATE_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case ActionTypes.UPDATE_TOTAL_PAGES:
        return { ...state, totalPages: action.payload };
    case ActionTypes.UPDATE_SEARCH_STRING:
        return { ...state, searchString: action.payload };
    default:
      return state;
  }
};

export default CommunityReducer;
