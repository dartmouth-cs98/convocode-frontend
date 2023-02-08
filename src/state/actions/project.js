import { getProject } from "../../services/projects";

export const ActionTypes = {
  LOAD_PROJECT: 'LOAD_PROJECT',
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
  ADD_PROJECT_STATUS: 'ADD_PROJECT_STATUS',

};

/**
 * @description load single project from backend 
 * @param id project id to load
 */
export const loadProject = (id) => {
  return async (dispatch) => {
    try {
      const data = await getProject(id);
      if (data) {
        console.log(data)
      }
      dispatch({ type: ActionTypes.LOAD_PROJECT, payload: data });
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
* @description add project status
*/
export const addProjectStatus = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_PROJECT_STATUS, payload: input });
  };
};
