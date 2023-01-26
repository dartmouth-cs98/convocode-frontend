import { combineReducers } from 'redux';

import FileManagementReducer from './fileManagement';
import VoiceReducer from './voice';
import CodeReducer from './code';
import SettingsReducer from './settings';
import ConvodexReducer from './convodex';
import JavascriptCodeReducer from './javascriptCode';
import HTMLCodeReducer from './htmlCode';
import CSSCodeReducer from './cssCode';
import ProjectIdReducer from './projectId';


const rootReducer = combineReducers({
  settings: SettingsReducer,
  fileManagement: FileManagementReducer,
  voice: VoiceReducer,
  code: CodeReducer,
  convodex: ConvodexReducer,
  javascriptCode: JavascriptCodeReducer,
  htmlCode: HTMLCodeReducer,
  cssCode: CSSCodeReducer,
  projectId: ProjectIdReducer,
});

export default rootReducer;
