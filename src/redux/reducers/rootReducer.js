import { combineReducers } from "redux";
import searchCriteriaReducer from "./searchCriteriaReducer";
import signupReducer from "./signupReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    signup: signupReducer,
    search: searchCriteriaReducer
});

export default rootReducer;