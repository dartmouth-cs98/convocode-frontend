import { combineReducers } from 'redux';

import FileManagementReducer from './fileManagement';
import VoiceReducer from './voice';
import CodeReducer from './code';
import SettingsReducer from './settings';
import ConvodexReducer from './convodex';
import FileReducer from './files';

const rootReducer = combineReducers({
  settings: SettingsReducer,
  fileManagement: FileManagementReducer,
  voice: VoiceReducer,
  code: CodeReducer,
  convodex: ConvodexReducer,
  fileSystem: FileReducer,
});

export default rootReducer;
