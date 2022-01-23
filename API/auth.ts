import auth, { providers } from "../firebase/authentication";
import db, { firestore } from "../firebase/firestore";
import User from "../types/user";

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

export const saveUserProfileToFirestore = async (
	userId: string,
	userInfo: User,
	callback: (errorMessage: string | null, userDataFromFirestore?: any) => any
) => {
	try {
		const userRef = db.collection("users").doc(userId);
		await userRef.set(
			{ ...userInfo, updatedAt: firestore.FieldValue.serverTimestamp() },
			{ merge: true }
		);
		return callback(null, (await userRef.get()).data());
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};
