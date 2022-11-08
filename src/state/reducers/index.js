import { combineReducers } from 'redux';

import FileManagementReducer from './fileManagement';
import VoiceReducer from './voice';
import CodeReducer from './code';
import SettingsReducer from './settings';

const rootReducer = combineReducers({
  settings: SettingsReducer,
  fileManagement: FileManagementReducer,
  voice: VoiceReducer,
  code: CodeReducer,
});

export default rootReducer;
