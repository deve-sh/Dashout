import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { getMerchantById } from "../../API/ServerSideAPIs/merchants";
import { getOrder, confirmOrderForUser } from "../../API/ServerSideAPIs/orders";

import verifyIDToken from "../../helpers/verifyIDToken";

import { OrderDetails } from "../../types/order";

export default async function confirmOrder(
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

		const order = (await getOrder(orderId)) as OrderDetails;
		if (!order || !order.merchant) return error(404, "Order Not Found");

		const merchant = await getMerchantById(order.merchant);
		if (!merchant) return error(404, "Merchant Not Found");

		if (order.status === "fulfilled")
			return error(400, "Order already fulfilled");
		if (order.status === "declined")
			return error(400, "Order already declined");

		// Do transaction related processing here.
		await confirmOrderForUser(orderId, order, decodedToken.uid, (err) => {
			if (err) return error(500, "Order could not be confirmed");
			// Notify the merchant
			if (merchant.webhookURL)
				axios.post(merchant.webhookURL, {
					orderId,
					status: "confirmed",
					type: "order_confirmed",
				});
			return res.status(200).json({
				message: "Confirmed Order Successfully",
				redirectTo: merchant.errorRedirect,
			});
		});
	} catch (err) {
		return error(500, err.message);
	}
}
