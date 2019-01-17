import { combineReducers } from "redux";
import StateReducer from "./stateReducer";

const rootReducer = combineReducers({
  userState: StateReducer
});

export default rootReducer;
