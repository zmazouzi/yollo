import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {store} from './configureStore'
import {Provider} from 'react-redux'
import {signIn} from "./actions/SignInActions";
import {signInWithYolo} from "./actions/SignInActions";

// store.dispatch(signIn());

window.onGoogleYoloLoad = (googleyolo) => {
	alert("ready")
	// signInWithYolo(googleyolo)
	store.dispatch(signIn(googleyolo))
};


ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
