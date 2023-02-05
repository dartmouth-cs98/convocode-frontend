import { getAllProjects } from '../../services/projects'

export const ActionTypes = {
  LOAD_PROJECTS: 'LOAD_PROJECTS',
};

/**
 * @description load all projects from backend 
 * @param num quantity of projects to load
 */
export const loadProjects = (num = "") => {
  return async (dispatch) => {
    try {
      const data = await getAllProjects();
      if (data) {
        console.log(data)
      }
      dispatch({ type: ActionTypes.LOAD_PROJECTS, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};
