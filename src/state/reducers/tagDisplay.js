import { ActionTypes } from '../actions';

const initialState = {
    javaDisplay: false,
    cssDisplay: false,
    htmlDisplay: false
}

const TagDisplayReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_JAVA_DISPLAY:
            return { ...state, javaDisplay: action.payload };
        case ActionTypes.SET_CSS_DISPLAY:
            return { ...state, cssDisplay: action.payload };
        case ActionTypes.SET_HTML_DISPLAY:
            return { ...state, htmlDisplay: action.payload };    
        default:
            return state;
    } 
};

export default TagDisplayReducer;