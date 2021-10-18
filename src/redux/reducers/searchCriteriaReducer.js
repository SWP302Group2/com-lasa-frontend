function merge(state, payload) {
    for (let propName in payload) {
        state[propName] = payload[propName];
    }
    return state;
}


const initialState = {
    searchValue: "",
    lecturers: [],
    topics: [],
    quantity: 1,
    unit: 30,
    type: "MONTH"
}

const searchCriteriaReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_SEARCH_CRITERIA": {
            return action?.payload ? merge({ ...initialState }, action.payload) : { ...initialState };
        }
        case "UPDATE_SEARCH_CRITERIA": {
            if (!action?.payload) return state;

            const newState = { ...state };
            return merge(newState, action.payload);
        }
        default:
            return state;
    }
}

export default searchCriteriaReducer;