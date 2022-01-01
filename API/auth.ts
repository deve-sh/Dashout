import auth, { providers } from "../firebase/authentication";

export const loginWithGoogle = async (
	callback: (errorMessage: string | null) => any
) => {
	try {
		if (!auth.currentUser) {
			await auth.signInWithPopup(providers.googleProvider);
			return callback(null);
		} else return callback("User already signed in.");
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};

export const loginWithGithub = async (
	callback: (errorMessage: string | null) => any
) => {
	try {
		if (!auth.currentUser) {
			await auth.signInWithPopup(providers.githubProvider);
			return callback(null);
		} else return callback("User already signed in.");
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};
