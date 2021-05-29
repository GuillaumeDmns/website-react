import { combineReducers } from "redux";

import authentication from "./authentication/authentication.reducer";

const reducer = combineReducers({
  authentication,
});

export default reducer;
