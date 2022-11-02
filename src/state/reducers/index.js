import { combineReducers } from 'redux';

import ModeReducer from './mode';
import FileManagementReducer  from './fileManagement';
import VoiceReducer from './voice';

const rootReducer = combineReducers({
  mode: ModeReducer,
  fileManagement: FileManagementReducer,
  voice: VoiceReducer,
});

export default rootReducer;
