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
  ActionTypes as fileSystemActionTypes,
  addFile,
} from './files';

const ActionTypes = {
  ...modeActionTypes,
  ...fileActionTypes,
  ...voiceActionTypes,
  ...codeActionTypes,
  ...convodexActionTypes,
  ...fileSystemActionTypes
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
  addFile,
}