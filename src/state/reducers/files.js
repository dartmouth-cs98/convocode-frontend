import { ActionTypes } from '../actions';

const initialState = {
    files: [
        {
            name: "testFile.py",
            language: "python",
            value: "# Sample"
        }
    ]
}

const FileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        default: 
            return state;

    }
}

export default FileReducer;