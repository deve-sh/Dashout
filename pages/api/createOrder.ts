import type { NextApiRequest, NextApiResponse } from "next";
import { OrderItem } from "../../types/order";
import { fetchMerchantByCredentials } from "../../helpers/merchants";

export default async function createOrder(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const error = (status: number, message: string) =>
		res.status(status).json({
			error: message,
			message,
		});

	try {
		const { clientId, clientSecret } = req.headers;
		const { item } = req.body as { item: OrderItem };

		if (!clientId || !clientSecret) return error(403, "Invalid credentials.");
		if (!item) return error(400, "Incomplete Information");

		const merchant = await fetchMerchantByCredentials({
			clientId,
			clientSecret,
		});

		if (!merchant) return error(403, "Invalid credentials");

		// Save this order as a new entry in the database.
	} catch (err) {}
}
