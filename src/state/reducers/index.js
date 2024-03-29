import { combineReducers } from 'redux';

import FileManagementReducer from './fileManagement';
import VoiceReducer from './voice';
import CodeReducer from './code';
import SettingsReducer from './settings';
import ProjectReducer from './project';
import UserReducer from './user';
import CommunityReducer from './community';
import TagDisplayReducer from './tagDisplay';


const rootReducer = combineReducers({
  settings: SettingsReducer,
  fileManagement: FileManagementReducer,
  voice: VoiceReducer,
  code: CodeReducer,
  project: ProjectReducer,
  user: UserReducer,
  community: CommunityReducer,
  tagDisplay: TagDisplayReducer,
});

export default rootReducer;
