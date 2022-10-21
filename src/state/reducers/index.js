import { combineReducers } from 'redux';

import ModeReducer from './mode';
import FileManagementReducer  from './fileManagment';

const rootReducer = combineReducers({
  mode: ModeReducer,
  fileManagement: FileManagementReducer,
});

export default rootReducer;
