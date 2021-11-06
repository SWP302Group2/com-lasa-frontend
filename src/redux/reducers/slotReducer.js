function merge(state, payload) {
    for (let propName in payload) {
        state[propName] = payload[propName];
    }
    return state;
}


const initialState = {
    timeStart: null,
    timeEnd: null,
    period: 30,
    selectedTopics: [],
    id: null,
    status: null,
    invalidMessages: null
}

const slotReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_SLOT": {
            return action?.payload ? merge({ ...initialState }, action.payload) : { ...initialState };
        }
        case "UPDATE_SLOT": {
            if (!action?.payload) return state;
            const newState = { ...state };
            return merge(newState, action.payload);
        }
        default:
            return state;
    }
}

export default slotReducer;