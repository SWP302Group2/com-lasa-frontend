import { combineReducers } from "redux";
import signupReducer from "./signupReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    signup: signupReducer
});

export default rootReducer;