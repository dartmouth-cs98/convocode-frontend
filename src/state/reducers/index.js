import { combineReducers } from 'redux';

import ModeReducer from './mode';
import FileManagementReducer  from './fileManagement';

const rootReducer = combineReducers({
  mode: ModeReducer,
  fileManagement: FileManagementReducer,
});

export default rootReducer;
