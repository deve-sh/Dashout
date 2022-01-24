import type { NextApiRequest, NextApiResponse } from "next";

import { getMerchantById } from "../../API/ServerSideAPIs/merchants";
import { declineOrderForUser, getOrder } from "../../API/ServerSideAPIs/orders";

import verifyIDToken from "../../helpers/verifyIDToken";

export default async function declineOrder(
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

		if (order.status === "fulfilled")
			return error(400, "Order already fulfilled");
		if (order.status === "declined")
			return error(400, "Order already declined");

		await declineOrderForUser(orderId, decodedToken.uid, (err) => {
			if (err) return error(500, "Order could not be declined");
			return res.status(200).json({
				message: "Declined Order Successfully",
				redirectTo: merchant.errorRedirect,
			});
		});
	} catch (err) {
		return error(500, err.message);
	}
}
