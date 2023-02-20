import { ActionTypes } from '../actions';

const initialState = {
    tagDisplay: false
}

const TagDisplayReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_DISPLAY_STATE:
            return { ...state, tagDisplay: action.payload };
        default:
            return state;
    } 
};

export default TagDisplayReducer;