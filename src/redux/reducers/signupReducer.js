

function merge(state, payload) {
    if (!payload || typeof payload !== "object")
        return state;
    state.processPosition = payload?.processPosition || state.processPosition;
    state.verifyStatus = payload?.verifyStatus || state.verifyStatus;

    for (let propName in payload.userInfo) {
        state.userInfo[propName] = payload.userInfo[propName];
    }
    return state;
}

const initialState = {
    userInfo: {},
    processPosition: 1,
};
const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_SIGNUP_INFO": {
            const newState = action.payload ? { ...action.payload } : initialState;
            return newState;
        }
        case "UPDATE_SIGNUP_INFO": {
            const newState = { ...state };
            return merge(newState, action.payload);
        }
        default:
            return state;
    }
}

export default signupReducer;
