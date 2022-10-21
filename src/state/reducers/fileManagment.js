import { ActionTypes } from '../actions';

const initialState = {
  fileName: "",
};

const FileManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_FILE_NAME:
      return { ...state, lightMode: action.payload};

    default:
      return state;
  }
};

export default FileManagementReducer;