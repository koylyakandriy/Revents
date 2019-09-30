import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "../reducers/rootReducer";

export const configureStore = () => {
	const middlewares = [thunk];

	const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

	const store = createStore(rootReducer, composedEnhancer);

	return store;
};
