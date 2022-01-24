import firebase from "./index";
import mainFirebase from "firebase/app";
import "firebase/auth";
import Cookie from "js-cookie";

const auth = firebase.auth();

// Providers
const googleProvider = new mainFirebase.auth.GoogleAuthProvider();
const githubProvider = new mainFirebase.auth.GithubAuthProvider();

export default auth;
export const providers = {
	googleProvider,
	githubProvider,
};

export const getToken = async (refresh = false) => {
	let cookie = Cookie.get("accessToken") || null;
	if (!cookie) cookie = (await auth.currentUser?.getIdToken?.(refresh)) || null;
	return cookie;
};
