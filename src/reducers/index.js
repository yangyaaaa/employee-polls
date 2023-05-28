import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import polls from "./questions";
import users from "./users";
import authedUser from "./authedUser";

export default combineReducers({
  authedUser,
  users,
  polls,
  loadingBarReducer,
});