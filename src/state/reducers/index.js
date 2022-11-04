import { combineReducers } from 'redux';

import ModeReducer from './mode';
import FileManagementReducer  from './fileManagement';
import VoiceReducer from './voice';
import CodeReducer from './code';

const rootReducer = combineReducers({
  mode: ModeReducer,
  fileManagement: FileManagementReducer,
  voice: VoiceReducer,
  code: CodeReducer,
});

export default rootReducer;
