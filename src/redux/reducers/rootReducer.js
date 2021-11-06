import { combineReducers } from "redux";
import bookingRequestReducer from "./bookingRequestReducer";
import searchCriteriaReducer from "./searchCriteriaReducer";
import signupReducer from "./signupReducer";
import slotReducer from "./slotReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    signup: signupReducer,
    search: searchCriteriaReducer,
    booking: bookingRequestReducer,
    slot: slotReducer
});

export default rootReducer;