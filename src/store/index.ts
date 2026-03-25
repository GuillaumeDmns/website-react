import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import reducer from "./reducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
