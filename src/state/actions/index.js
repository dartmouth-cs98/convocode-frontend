import {
  ActionTypes as modeActionTypes,
  toggleViewMode,
} from './mode';

import {
  ActionTypes as fileActionTypes,
  createFileName,
} from './fileManagement';

const ActionTypes = {
  ...modeActionTypes,
  ...fileActionTypes,
};

export {
  ActionTypes,
  toggleViewMode,
  createFileName,
}