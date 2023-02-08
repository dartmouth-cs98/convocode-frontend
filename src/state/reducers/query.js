import { ActionTypes } from '../actions';

const queryState = {
    query: ""
}

const QueryReducer = (state = queryState, action) => {
    switch (action.type) {
        case ActionTypes.SET_QUERY:
            return {...state, query: action.payload};
        default:
            return state;
    }
};

export default QueryReducer;