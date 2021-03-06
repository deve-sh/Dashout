import db, { firestore } from "../firebase/firestore";
import { v4 as uuid } from "uuid";

export const getMerchantsForUser = async (
	userId: string,
	callback: (errorMessage: string, merchantsList: any[]) => any
) => {
	try {
		let merchantsRef = db
			.collection("merchants")
			.where("members", "array-contains", userId)
			.orderBy("createdAt", "desc");
		return callback(null, (await merchantsRef.get()).docs);
	} catch (err) {
		console.log(err);
		return callback(err.message, []);
	}
};

export const createMerchantForUser = async (
	userId: string,
	merchantDetails: any,
	callback: (errorMessage: string, merchantInfo?: any) => any
) => {
	try {
		const merchantRef = db.collection("merchants").doc();
		const userRef = db.collection("users").doc(userId);
		const batch = db.batch();

		batch.set(merchantRef, {
			...merchantDetails,
			createdAt: firestore.FieldValue.serverTimestamp(),
			updatedAt: firestore.FieldValue.serverTimestamp(),
			clientId: uuid(),
			clientSecret: uuid(),
			nMembers: 1,
			members: [userId],
			createdBy: userId,
		});
		batch.update(userRef, {
			nMerchants: firestore.FieldValue.increment(1),
			updatedAt: firestore.FieldValue.serverTimestamp(),
			merchants: firestore.FieldValue.arrayUnion(merchantRef.id),
		});

		await batch.commit();

		return callback(null, (await merchantRef.get()).data());
	} catch (err) {
		console.log(err);
		return callback(err.message, null);
	}
};

export const addUserToMerchant = async (
	userId: string,
	merchantId: string,
	callback: (errorMessage: string, updatedMerchantInfo?: any) => any
) => {
	try {
		const merchantRef = db.collection("merchants").doc(merchantId);
		const userRef = db.collection("users").doc(userId);
		const batch = db.batch();

		batch.set(merchantRef, {
			updatedAt: firestore.FieldValue.serverTimestamp(),
			nMembers: firestore.FieldValue.increment(1),
			members: firestore.FieldValue.arrayUnion(userId),
		});
		batch.update(userRef, {
			nMerchants: firestore.FieldValue.increment(1),
			updatedAt: firestore.FieldValue.serverTimestamp(),
			merchants: firestore.FieldValue.arrayUnion(merchantRef.id),
		});

		await batch.commit();

		return callback(null, (await merchantRef.get()).data());
	} catch (err) {
		console.log(err);
		return callback(err.message, null);
	}
};
