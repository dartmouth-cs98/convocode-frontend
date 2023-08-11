import { getAllProjects, searchProjects, getProjectSize, getSearchedProjectSize } from '../../services/projects'

export const ActionTypes = {
  LOAD_PROJECTS: 'LOAD_PROJECTS',
  UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
  UPDATE_TOTAL_PAGES: 'UPDATE_TOTAL_PAGES',
  UPDATE_SEARCH_STRING: 'UPDATE_SEARCH_STRING',
};

/**
 * @description load all projects from backend 
 * @param num quantity of projects to load
 */
export const loadProjects = (searchString = "", currentPage = 1) => {
  return async (dispatch) => {
    try {
      let data = null;
      if(searchString === ""){
        data = await getAllProjects(currentPage);
      }
      else{
        data = await searchProjects(searchString, currentPage);
      }
      
      dispatch({ type: ActionTypes.LOAD_PROJECTS, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};

/**
 * @description update pagination current page
 * @param num current page
 */
export const updateCurrentPage = (currentPage = 1) => {
  return async (dispatch) => {
    try {
      let data = currentPage;
      dispatch({ type: ActionTypes.UPDATE_CURRENT_PAGE, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};


/**
 * @description update pagination total pages
 * @param num current page
 */
export const updateTotalPages = (searchString = "") => {
  return async (dispatch) => {
    try {

      var projectSize = null;
      if(searchString === ""){
        projectSize = await getProjectSize();
      }
      else{
        //data = await searchProjects(searchString);
        projectSize = await getSearchedProjectSize(searchString);
      }

      const data = Math.ceil(projectSize / 18);
      dispatch({ type: ActionTypes.UPDATE_TOTAL_PAGES, payload: data });      
    } catch (error) {
      console.log(error)
    }
  };
};

export const updateSearchString = (searchString = "") => {
  return async (dispatch) => {
    try {
      let data = searchString;
      dispatch({ type: ActionTypes.UPDATE_SEARCH_STRING, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};
