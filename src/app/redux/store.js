import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducers";
import logger from "./logger";
const initialState = {};
const middleware = [thunk, logger];
const enhancers = compose(composeWithDevTools(applyMiddleware(...middleware)));
export default createStore(rootReducer, initialState, enhancers);
