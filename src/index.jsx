import React from "react";
import { Provider } from "react-redux";
import App from "./App.jsx";
import rootReducer from "./reducers";
import logger from "redux-logger";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {  faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { getUsers } from "./actions/users.actions.jsx";

library.add(fas, faFontAwesome)

const store = createStore(
	rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);
store.dispatch(getUsers())

ReactDOM.render(
	
		<React.StrictMode>
			<Provider store={store}>
			<App></App>
			</Provider>
		</React.StrictMode>,

	document.getElementById("root")
);
