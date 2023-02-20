import { getProject, createNewProject, getComments, commentOnProject, commentOnComment, likeServiceProject } from "../../services/projects";
import { refreshUser } from "./user";

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
  ADD_PROJECT_STATUS: 'ADD_PROJECT_STATUS',
  CLEAR_PROJECT_DATA: 'CLEAR_PROJECT_DATA',
  ADD_CLEANED_CODE: 'ADD_CLEANED_CODE',
  ADD_COMMENTS: 'ADD_COMMENTS',
  ADD_NEW_COMMENT: 'ADD_NEW_COMMENT',
  SET_REPLYING_TO: 'SET_REPLYING_TO',
  SET_REPLYING_USER: 'SET_REPLYING_USER'
  LIKE_PROJECT: 'LIKE_PROJECT',
};

/**
 * @description load single project from backend 
 * @param id project id to load
 */
export const loadProject = (id) => {
  return async (dispatch) => {
    try {

      const data = await getProject(id);

      // get comments on project too
      const commentObjects = await getComments(id);
      console.log("unsorted comment data")
      console.log(commentObjects);

      // build new array in comment-reply order
      // they should already be sorted by date as returned by mongoose
      var sortedComments = [];

      for (const comment of commentObjects) {

        // check if base comment or reply
        if (!(comment.replyingTo)) {  // is base comment

          // push base comment
          sortedComments.push(comment);
          // get its id
          const currentCommentId = comment.id;
          // find its replies
          const replies = commentObjects.filter(comment => comment.replyingTo == currentCommentId);
          // push its replies
          for (const reply of replies) {
            sortedComments.push(reply);
          }
        }
        // skip if reply 
      }
      console.log("sorted comments")
      console.log(sortedComments)

      dispatch({ type: ActionTypes.LOAD_PROJECT, payload: data });
      dispatch({ type: ActionTypes.ADD_COMMENTS, payload: sortedComments });

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
      if (data) {
        console.log("created", data)
      }
      dispatch({ type: ActionTypes.CREATE_PROJECT, payload: data });
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



export const addCleanedJavascript = (input) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_CLEANED_CODE, payload: input });
  }
}

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


/**
 * @description like a project
 * @param id project id to like
 */
export const likeProject = (projectId) => {
  return async (dispatch) => {
    try {
      console.log("in try to like ")
      const data = await likeServiceProject(projectId)
      console.log(data)
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

      // dispatch new comment
      dispatch({ type: ActionTypes.ADD_NEW_COMMENT, payload: data });

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
    console.log("SET REPLYING TO")
    console.log(replyingTo)
    console.log(username)
    dispatch({ type: ActionTypes.SET_REPLYING_TO, payload: replyingTo });
    dispatch({ type: ActionTypes.SET_REPLYING_USER, payload: username });
  };
};