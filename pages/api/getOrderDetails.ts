import type { NextApiRequest, NextApiResponse } from "next";

import { getMerchantById } from "../../API/ServerSideAPIs/merchants";
import { getOrder } from "../../API/ServerSideAPIs/orders";

import verifyIDToken from "../../helpers/verifyIDToken";

export default async function getOrderAndMerchant(
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
		const { orderId } = req.body as { orderId: string };

		if (!orderId) return error(403, "Invalid credentials.");

		const decodedToken = await verifyIDToken(authorization);
		if (!decodedToken || !decodedToken.uid)
			return error(403, "Invalid credentials");

		const order = await getOrder(orderId);
		if (!order || !order.merchant) return error(404, "Order Not Found");

		const merchant = await getMerchantById(order.merchant);
		if (!merchant) return error(404, "Merchant Not Found");

		return res.status(200).json({
			message: "Fetched Order details successfully",
			order,
			merchant: {
				merchantName: merchant.merchantName,
				photoURL: merchant.photoURL,
				errorRedirect: merchant.errorRedirect,
				successRedirect: merchant.successRedirect,
			},
		});
	} catch (err) {
		return error(500, err.message);
	}
}
