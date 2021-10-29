
const initialState = {
    searchValue: "",
    lecturers: [],
    topics: [],
    days: 7,
    uuid: ""
}

function merge(state, payload) {
    if (payload) {
        for (const propName in payload) state[propName] = payload[propName];
    }
    return state;
}

const searchCriteriaReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_SEARCH_CRITERIA": {
            return merge({ ...initialState }, action.payload);
        }
        case "UPDATE_SEARCH_CRITERIA": {
            return merge({ ...state }, action.payload);
        }
        default:
            return state;
    }
}

export default searchCriteriaReducer;