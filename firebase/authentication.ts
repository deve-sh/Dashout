import firebase from "./index";
import mainFirebase from "firebase/app";
import "firebase/auth";

const auth = firebase.auth();

// Providers
const googleProvider = new mainFirebase.auth.GoogleAuthProvider();

export default auth;
export const providers = {
	googleProvider,
};
