import admin from "../../firebase/admin";

// Create, fetch and manipulate merchants here.
export const getMerchant = async (clientId: string, clientSecret: string) => {
	try {
		const merchant = (
			await admin
				.firestore()
				.collection("merchants")
				.where("clientId", "==", clientId)
				.where("clientSecret", "==", clientSecret)
				.limit(1)
				.get()
		).docs[0];
		return merchant || null;
	} catch (err) {
		console.log(err);
		return null;
	}
};
