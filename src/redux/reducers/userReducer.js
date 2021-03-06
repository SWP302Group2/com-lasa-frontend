
const initialUser = {}

const userReducer = (state = initialUser, action) => {
    function mergePayloadToState(newState, payload) {
        if (!payload || typeof payload !== "object")
            return newState;

        for (let propName in payload) {
            newState[propName] = payload[propName];
        }
        return newState;
    }

    switch (action.type) {
        case "NEW_USER_INFO": {
            const newState = { ...action.payload } || { ...initialUser };
            return newState;
        }
        case "UPDATE_USER_INFO": {
            const newState = { ...state };
            return { ...mergePayloadToState(newState, action.payload) };
        }
        default:
            return state;
    }
}

export default userReducer;