import {
  ActionTypes as modeActionTypes,
  toggleViewMode,
  updateFontSize,
} from './settings';

import {
  ActionTypes as fileActionTypes,
  createFileName,
} from './fileManagement';

import {
  ActionTypes as voiceActionTypes,
  addSpeech,
} from './voice';

import {
  ActionTypes as codeActionTypes,
  addCode,
  insertCode,
} from './code';

import {
  ActionTypes as userActionTypes,
  login,
  signup,
  getUserFromStorage,
  signOut,
} from "./user";

import {
  ActionTypes as communityActionTypes,
  loadProjects
} from './community';

import {
  ActionTypes as profileActionTypes,
  loadUserProjects,
  loadLikedProjects
} from './profile';

import {
  ActionTypes as tagDisplayActionTypes,
  setDisplay,
} from './tagDisplay';

import {
  ActionTypes as projectActionTypes,
  addJavascriptCode,
  insertJavascriptCode,
  addHTMLCode,
  insertHTMLCode,
  addCSSCode,
  insertCSSCode,
  addProjectId,
  addProjectTitle,
  addProjectDescription,
  addProjectTag,
  addCleanedJavascript,
  addProjectStatus,
  createProject,
  addCodeHistory,

} from './project';

const ActionTypes = {
  ...modeActionTypes,
  ...fileActionTypes,
  ...voiceActionTypes,
  ...codeActionTypes,
  ...projectActionTypes,
  ...userActionTypes,
  ...communityActionTypes,
  ...tagDisplayActionTypes,
};

export {
  ActionTypes,
  toggleViewMode,
  updateFontSize,
  createFileName,
  addSpeech,
  addCode,
  insertCode,
  addJavascriptCode,
  addHTMLCode,
  addCSSCode,
  insertJavascriptCode,
  insertCSSCode,
  insertHTMLCode,
  addProjectId,
  addProjectTitle,
  addProjectDescription,
  addProjectTag,
  addProjectStatus,
  login,
  signup,
  getUserFromStorage,
  signOut,
  addCleanedJavascript,
  loadProjects,
  loadUserProjects,
  loadLikedProjects,
  createProject,
  addCodeHistory,
  setDisplay,
}