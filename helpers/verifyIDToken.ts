import admin from "../firebase/admin";

const verifyIDToken = async (token: string) => {
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		return decodedToken;
	} catch (err) {
		return null;
	}
};

export default verifyIDToken;
