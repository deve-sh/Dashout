import admin from "../../firebase/admin";
import { OrderItem } from "../../types/order";

export const createNewOrder = async (
	merchant: string,
	orderDetails: OrderItem,
	callback: (errorMessage: string, createdOrder?: any) => any
) => {
	try {
		const batch = admin.firestore().batch();
		const orderRef = admin.firestore().collection("orders").doc();
		const merchantRef = admin.firestore().collection("merchants").doc(merchant);

		const fieldValues = admin.firestore.FieldValue;

		batch.update(merchantRef, {
			nOrdersCreated: fieldValues.increment(1),
			updatedAt: fieldValues.serverTimestamp(),
		});
		batch.set(orderRef, {
			...orderDetails,
			status: "pending",
			merchant,
			updatedAt: fieldValues.serverTimestamp(),
			createdAt: fieldValues.serverTimestamp(),
		});

		await batch.commit();

		return callback(null, (await orderRef.get()).data());
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};

export const getOrder = async (orderId: string) => {
	try {
		return (
			await admin.firestore().collection("orders").doc(orderId).get()
		).data();
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const declineOrderForUser = async (
	orderId: string,
	userId: string,
	callback: (errorMessage: string, createdOrder?: any) => any
) => {
	try {
		const orderRef = admin.firestore().collection("orders").doc(orderId);

		const fieldValues = admin.firestore.FieldValue;

		await orderRef.update({
			status: "declined",
			declinedBy: userId,
			declinedAt: fieldValues.serverTimestamp(),
			updatedAt: fieldValues.serverTimestamp(),
		});

		return callback(null);
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};
