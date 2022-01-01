/*
	The main firebase configuration file.
*/

import firebase from "firebase/app";

const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

const firebasePrimaryApp = !firebase.apps.length
	? firebase.initializeApp(config)
	: firebase.apps[0];

export default firebasePrimaryApp;
