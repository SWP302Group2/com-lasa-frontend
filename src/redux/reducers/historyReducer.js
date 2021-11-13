

const initialState = [];

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_HISTORY": {
            return initialState || [];
        }
        case "UPDATE_HISTORY": {
            const newState = Array.isArray(state) && state > 0 ? [...state] : [];
            const newLocation = action.payload;
            if(newLocation) {
                console.log("History");
                console.log(newState);
                console.log("newLocation");
                console.log(newLocation);
                if(newState.length <= 0) {
                    newState.push(newLocation);
                }

                if(newState.length > 0 ){
                    if(newState[newState.length - 1] !== newLocation) {
                        newState.push(newLocation);
                    }
                }
            }

            if(newState.length > 100) {
                newState.splice(0,1);
            }
            return newState;
        }
        default:
            return state;
    }
}

export default historyReducer;