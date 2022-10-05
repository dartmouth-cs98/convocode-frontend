// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import ResourceReducer from './resourceReducer';
import RequestReducer from './requestReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  resource: ResourceReducer,
  request: RequestReducer,
});

export default rootReducer;
