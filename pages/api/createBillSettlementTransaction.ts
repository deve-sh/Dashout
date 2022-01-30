import type { NextApiRequest, NextApiResponse } from "next";

import razorpay from "../../helpers/razorpay";
import admin from "../../firebase/admin";
import verifyIDToken from "../../helpers/verifyIDToken";

export default async function createWalletAddMoneyTransaction(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const error = (status: number, message: string) =>
		res.status(status).json({
			error: message,
			message,
		});

	try {
		const { authorization } = req.headers;

		if (!authorization) return error(400, "Invalid credentials.");

		// Get user details from token.
		const decodedToken = await verifyIDToken(authorization);
		if (!decodedToken) return error(401, "Unauthorized");

		const batch = admin.firestore().batch();
		const userRef = admin.firestore().collection("users").doc(decodedToken.uid);

		const userData = (await userRef.get()).data();
		if (!userData) return error(404, "User info not found.");

		const amount =
			Number(userData.totalTransactionAmount) -
			Number(userData.totalAmountRepaid);

		const order = await razorpay.orders.create({
			amount,
			currency: "INR",
			notes: { user: decodedToken.uid },
		});

		if (order) {
			const userBillSettlementRef = admin
				.firestore()
				.collection("userbillsettlements")
				.doc(order.id);
			batch.set(userBillSettlementRef, {
				...order,
				user: decodedToken.uid,
				amount,
				wallet: decodedToken.uid,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			await batch.commit();
			return res
				.status(201)
				.json({ message: "Created Settlement Order Successfully", order });
		}
		return error(500, "Payment could not be created.");
	} catch (err) {
		console.log(err);
		return error(500, err.message);
	}
}
