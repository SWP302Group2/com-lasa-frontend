
const initialUser = {}

const userReducer = (state = initialUser, action) => {
    function mergePayloadToState(newState, payload) {
        if (typeof payload !== "object") return newState;

        for (let propName in payload) {
            newState[propName] = payload[propName];
        }
        return newState;
    }

    switch (action.type) {
        case "NEW_USER_INFO": {
            const newState = { ...initialUser };
            return mergePayloadToState(newState, action.payload);
        }
        case "UPDATE_USER_INFO": {
            const newState = { ...state };
            return mergePayloadToState(newState, action.payload);
        }
        default:
            return state;
    }
}

export default userReducer;