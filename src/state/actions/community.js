import { getAllProjects, searchProjects } from '../../services/projects'

export const ActionTypes = {
  LOAD_PROJECTS: 'LOAD_PROJECTS',
};

/**
 * @description load all projects from backend 
 * @param num quantity of projects to load
 */
export const loadProjects = (searchString = "") => {
  return async (dispatch) => {
    try {
      let data = null;
      if(searchString === ""){
        data = await getAllProjects();
      }
      else{
        data = await searchProjects(searchString);
      }
      
      dispatch({ type: ActionTypes.LOAD_PROJECTS, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};
