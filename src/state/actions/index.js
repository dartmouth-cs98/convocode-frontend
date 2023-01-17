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
  ActionTypes as javascriptCodeActionTypes,
  addJavascriptCode,
  insertJavascriptCode,
} from './javascriptCode';

import {
  ActionTypes as htmlCodeActionTypes,
  addHTMLCode,
  insertHTMLCode,
} from './htmlCode';

import {
  ActionTypes as cssCodeActionTypes,
  addCSSCode,
  insertCSSCode,
} from './cssCode';

const ActionTypes = {
  ...modeActionTypes,
  ...fileActionTypes,
  ...voiceActionTypes,
  ...codeActionTypes,
  ...convodexActionTypes,
  ...javascriptCodeActionTypes,
  ...htmlCodeActionTypes,
  ...cssCodeActionTypes,
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
}