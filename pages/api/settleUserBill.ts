import type { NextApiRequest, NextApiResponse } from "next";
import { createHmac } from "crypto";

import razorpay from "../../helpers/razorpay";
import admin from "../../firebase/admin";
import verifyIDToken from "../../helpers/verifyIDToken";

export default async function settleUserBillAPI(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const error = (status: number, message: string) =>
		res.status(status).json({
			error: message,
			message,
		});

	try {
		const {
			status = "successful",
			razorpay_payment_id,
			razorpay_order_id,
			razorpay_signature,
			razorpay_error,
		} = req.body;
		const { authorization } = req.headers;

		if (!razorpay_order_id || !authorization)
			return error(400, "Incomplete Information");

		// Get user details from token.
		const decodedToken = await verifyIDToken(authorization);
		if (!decodedToken) return error(401, "Unauthorized");

		const userBillSettlementRef = admin
			.firestore()
			.collection("userbillsettlements")
			.doc(razorpay_order_id);

		const userBillSettlementData = (await userBillSettlementRef.get()).data();

		if (
			!userBillSettlementData ||
			userBillSettlementData.user !== decodedToken.uid
		)
			return error(404, "Bill Settment Record not found.");
		else if (userBillSettlementData.status !== "created")
			return error(400, "Payment has already been processed.");

		const batch = admin.firestore().batch();

		const userRef = admin.firestore().collection("users").doc(decodedToken.uid);

		const userData = (await userRef.get()).data();
		if (!userData) return error(404, "User info not found.");

		const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
		if (!razorpayOrder) return error(404, "Razorpay order info not found.");

		if (status === "successful") {
			if (!razorpay_payment_id || !razorpay_signature)
				return error(400, "Incomplete Information");

			// Verifying signature
			const generatedSignature = createHmac(
				"sha256",
				process.env.RAZORPAY_KEY_SECRET
			)
				.update(razorpay_order_id + "|" + razorpay_payment_id)
				.digest("hex");

			if (generatedSignature != razorpay_signature)
				return error(403, "Unauthorized");

			const billSettlementPayments = await razorpay.orders.fetchPayments(
				razorpay_order_id
			);
			batch.update(userBillSettlementRef, {
				...razorpayOrder,
				payments: billSettlementPayments || [],
				updatedAt: new Date(),
			});
			batch.update(userRef, {
				totalAmountRepaid: userData.totalTransactionAmount,
				updatedAt: new Date(),
			});
		} else {
			// Payment failure setting.
			if (!razorpay_error) return error(400, "Incomplete Information");
			batch.update(userBillSettlementRef, {
				...razorpayOrder,
				payments: [],
				updatedAt: new Date(),
			});
		}

		await batch.commit();
		return res.status(200).json({ message: "Updated user bill successfully." });
	} catch (err) {
		return error(500, err.message);
	}
}
