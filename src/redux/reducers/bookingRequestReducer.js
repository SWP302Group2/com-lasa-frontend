function merge(state, payload) {
    for (let propName in payload) {
        state[propName] = payload[propName];
    }
    return state;
}


const initialState = {
    slot: null,
    topicId: null,
    questions: [],
    title: "",
    exceedNumberOfQuestions: "",
    titleMustHave: "",
    topicMustSelect: ""
}

const bookingRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_BOOKING_REQUEST": {
            return action?.payload ? merge({ ...initialState }, action.payload) : { ...initialState };
        }
        case "UPDATE_BOOKING_REQUEST": {
            if (!action?.payload) return state;
            const newState = { ...state };
            return merge(newState, action.payload);
        }
        default:
            return state;
    }
}

export default bookingRequestReducer;