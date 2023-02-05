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
  ActionTypes as convodexActionTypes,
  addConvodexEntry,
} from './convodex';

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
  insertCodeTag,
  replaceCodeTag,
  appendCodeTag,
  deleteCodeTag,

} from './project';

const ActionTypes = {
  ...modeActionTypes,
  ...fileActionTypes,
  ...voiceActionTypes,
  ...codeActionTypes,
  ...convodexActionTypes,
  ...projectActionTypes,
};

export {
  ActionTypes,
  toggleViewMode,
  updateFontSize,
  createFileName,
  addSpeech,
  addCode,
  insertCode,
  addConvodexEntry,
  addJavascriptCode,
  addHTMLCode,
  addCSSCode,
  insertJavascriptCode,
  insertCSSCode, 
  insertHTMLCode,
  addProjectId,
  addProjectTitle,
  insertCodeTag,
  replaceCodeTag,
  appendCodeTag,
  deleteCodeTag,
}