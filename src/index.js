import React from "react";
import ReactDOM from "react-dom";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";

import * as serviceWorker from "./serviceWorker";
import App from "./app/layout/App";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/common/utill/ScrollToTop";

import "./index.css";

const store = configureStore();

const rootEl = document.getElementById("root");

let render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<ScrollToTop>
					<ReduxToastr
						position='bottom-right'
						transitionIn='fadeIn'
						transitionOut='fadeOut'
					/>
					<App />
				</ScrollToTop>
			</Router>
		</Provider>,
		rootEl
	);
};

if (module.hot) {
	module.hot.accept("./app/layout/App", () => {
		setTimeout(render);
	});
}

store.firebaseAuthIsReady.then(() => {
	render();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
