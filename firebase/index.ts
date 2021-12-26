/*
	The main firebase configuration file.
*/

import * as firebase from "firebase/app";

const config = JSON.parse(process.env.FIREBASE_CONFIG);

const firebasePrimaryApp = firebase["apps"].length
	? firebase["apps"][0]
	: firebase["initializeApp"](config);

export default firebasePrimaryApp;
