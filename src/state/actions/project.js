import { getProject, createNewProject, getComments, commentOnProject, commentOnComment, likeServiceProject, updateProject } from "../../services/projects";

export const ActionTypes = {
  LOAD_PROJECT: 'LOAD_PROJECT',
  CREATE_PROJECT: 'CREATE_PROJECT',
  ADD_JAVASCRIPT_CODE: 'ADD_JAVASCRIPT_CODE',
  INSERT_JAVASCRIPT_CODE: 'INSERT_JAVASCRIPT_CODE',
  ADD_HTML_CODE: 'ADD_HTML_CODE',
  INSERT_HTML_CODE: 'INSERT_HTML_CODE',
  ADD_CSS_CODE: 'ADD_CSS_CODE',
  INSERT_CSS_CODE: 'INSERT_CSS_CODE',
  ADD_PROJECT_ID: 'ADD_PROJECT_ID',
  ADD_PROJECT_TITLE: 'ADD_PROJECT_TITLE',
  ADD_PROJECT_DESCRIPTION: 'ADD_PROJECT_DESCRIPTION',
  ADD_PROJECT_TAG: 'ADD_PROJECT_TAG',
  DELETE_PROJECT_TAG: 'DELETE_PROJECT_TAG',
  ADD_PROJECT_STATUS: 'ADD_PROJECT_STATUS',
  ADD_PROJECT_OBJECT: 'ADD_PROJECT_OBJECT',
  CLEAR_PROJECT_DATA: 'CLEAR_PROJECT_DATA',
  ADD_CLEANED_CODE: 'ADD_CLEANED_CODE',
  ADD_JAVA_CODE_HISTORY: 'ADD_JAVA_CODE_HISTORY',
  ADD_CSS_CODE_HISTORY: 'ADD_CSS_CODE_HISTORY',
  ADD_HTML_CODE_HISTORY: 'ADD_HTML_CODE_HISTORY',
  ADD_COMMENTS: 'ADD_COMMENTS',
  ADD_NEW_COMMENT: 'ADD_NEW_COMMENT',
  SET_REPLYING_TO: 'SET_REPLYING_TO',
  SET_REPLYING_USER: 'SET_REPLYING_USER',
  LIKE_PROJECT: 'LIKE_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
};

/**
 * @description load single project from backend 
 * @param id project id to load
 */
export const loadProject = (id) => {
  return async (dispatch) => {
    try {

      const data = await getProject(id);

      dispatch({ type: ActionTypes.LOAD_PROJECT, payload: data });
      //dispatch({ type: ActionTypes.ADD_COMMENTS, payload: sortedComments });

    } catch (error) {
      console.log(error)
    }
  };
};

/**
 * @description generates a new project
 * @param newProject the data 
 */
export const createProject = (newProject) => {
  return async (dispatch) => {
    try {
      const data = await createNewProject(newProject);

      dispatch({ type: ActionTypes.CREATE_PROJECT, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};

/**
 * @description updates a new project
 * @param newProject the data 
 */
 export const updateExistingProject = (projectInfo) => {
  return async (dispatch) => {
    try {
      const data = await updateProject(projectInfo);
      if (data) {
        console.log("updated", data);
      }
      dispatch({ type: ActionTypes.UPDATE_PROJECT, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};

/**
 * @description update the code string
 */
export const addJavascriptCode = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_JAVASCRIPT_CODE, payload: input });
  };
};


/**
 * @description append new input to code string from axios
 */
export const insertJavascriptCode = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.INSERT_JAVASCRIPT_CODE, payload: input });
  };
};

/**
 * @description update the code string
 */
export const addHTMLCode = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_HTML_CODE, payload: input });
  };
};


/**
 * @description append new input to code string from axios
 */
export const insertHTMLCode = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.INSERT_HTML_CODE, payload: input });
  };
};

/**
 * @description update the code string
 */
export const addCSSCode = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_CSS_CODE, payload: input });
  };
};

/**
 * @description append new input to code string from axios
 */
export const insertCSSCode = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.INSERT_CSS_CODE, payload: input });
  };
};

/**
 * @description update the project id
 */
export const addProjectId = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_PROJECT_ID, payload: input });
  };
};

/**
 * @description add project title
 */
export const addProjectTitle = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_PROJECT_TITLE, payload: input });
  };
};

/**
 * @description add project description
 */
export const addProjectDescription = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_PROJECT_DESCRIPTION, payload: input });
  };
};

/**
* @description add project tag
*/
export const addProjectTag = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_PROJECT_TAG, payload: input });
  };
};

/**
* @description delete project tag
*/
export const deleteProjectTag = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.DELETE_PROJECT_TAG, payload: input });
  };
};


export const addCleanedJavascript = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_CLEANED_CODE, payload: input });
  };
};

/**
* @description add project status
*/
export const addProjectStatus = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_PROJECT_STATUS, payload: input });
  };
};


/**
 * @description clears project data
 */
export const clearProject = () => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_PROJECT_DATA, payload: {} });
  };
};

export const addJavaCodeHistory = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_JAVA_CODE_HISTORY, payload: input });
  };
};

export const addCSSCodeHistory = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_CSS_CODE_HISTORY, payload: input });
  };
};

export const addHTMLCodeHistory = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_HTML_CODE_HISTORY, payload: input });
  };
};



/**
 * @description like a project
 * @param id project id to like
 */
export const likeProject = (projectId) => {
  return async (dispatch) => {
    try {
    
      const data = await likeServiceProject(projectId)
  
      dispatch({ type: ActionTypes.LIKE_PROJECT, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};

/**
 * @description comment on project - reach through 'Submit' buttom
 * @param id project id to load
 */
export const comment = (projectId, commentBody, replyingTo) => {

  return async (dispatch) => {
    try {

      // add comment to db
      const data = await commentOnProject(projectId, commentBody, replyingTo);

      // update project in redux
      dispatch({ type: ActionTypes.ADD_COMMENTS, payload: data });

    } catch (error) {
      console.log(error)
    }
  };
};

/**
* @description adds replyingTo 
*/
export const setReplyingTo = (replyingTo, username) => {
  return (dispatch) => {

    dispatch({ type: ActionTypes.SET_REPLYING_TO, payload: replyingTo });
    dispatch({ type: ActionTypes.SET_REPLYING_USER, payload: username });
  };
};

/**
 * @description like a project
 * @param id project id to like
 */
export const deleteProject = (projectId) => {
  return async (dispatch) => {
    try {
    
      const data = await deleteProject(projectId);
  

      dispatch({ type: ActionTypes.LIKE_PROJECT, payload: data });
    } catch (error) {
      console.log(error)
    }
  };
};