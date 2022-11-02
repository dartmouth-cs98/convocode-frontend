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

const ActionTypes = {
  ...modeActionTypes,
  ...fileActionTypes,
  ...voiceActionTypes,
};

export {
  ActionTypes,
  toggleViewMode,
  createFileName,
  addSpeech,
}