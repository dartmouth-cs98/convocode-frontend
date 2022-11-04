import {
  ActionTypes as modeActionTypes,
  toggleViewMode,
} from './mode';

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
} from './code';

const ActionTypes = {
  ...modeActionTypes,
  ...fileActionTypes,
  ...voiceActionTypes,
  ...codeActionTypes,
};

export {
  ActionTypes,
  toggleViewMode,
  createFileName,
  addSpeech,
  addCode,
}