import { combineReducers } from 'redux';

import ModeReducer from './mode';

const rootReducer = combineReducers({
  mode: ModeReducer,
});

export default rootReducer;
