import { ActionTypes } from '../actions';

const initialState = {
  fileName: "newFile.py",
};

const FileManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FILE_NAME:
      return { ...state, fileName: action.payload };

    default:
      return state;
  }
};

export default FileManagementReducer;