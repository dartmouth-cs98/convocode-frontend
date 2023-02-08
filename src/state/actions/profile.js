import { getUserProjects, getLikedProjects } from '../../services/projects'

export const ActionTypes = {
  LOAD_USER_PROJECTS: 'LOAD_USER_PROJECTS',
  LOAD_LIKED_PROJECTS: 'LOAD_LIKED_PROJECTS'
};

/**
 * @description load all user's authored projects from db 
 * @param userId user id
 */
export const loadUserProjects = () => {
  return async (dispatch) => {
    try {
      console.log("in profile action");
      const data = await getUserProjects();
      if (data) {
        console.log(data)
      }
      dispatch({ type: ActionTypes.LOAD_USER_PROJECTS, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};

/**
 * @description load all user's liked projects from db
 * @param userId user id
 */
export const loadLikedProjects = (userId) => {
    return async (dispatch) => {
      try {
        console.log("getting liked projects");
        const data = await getLikedProjects(userId);
        if (data) {
          console.log(data)
        }
        dispatch({ type: ActionTypes.LOAD_LIKED_PROJECTS, payload: data });
      } catch (error) {
        console.log(error)
      }
    };
  };