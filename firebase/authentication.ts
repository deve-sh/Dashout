import firebase from "./index";
import mainFirebase from "firebase/app";
import "firebase/auth";

const auth = firebase.auth();

// Providers
const googleProvider = new mainFirebase.auth.GoogleAuthProvider();
const githubProvider = new mainFirebase.auth.GithubAuthProvider();

export default auth;
export const providers = {
	googleProvider,
	githubProvider,
};

export const getToken = async () => {
	if (auth.currentUser) return await auth.currentUser.getIdToken();
	return null;
};
