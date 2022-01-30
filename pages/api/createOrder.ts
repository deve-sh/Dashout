import type { NextApiRequest, NextApiResponse } from "next";
import type { OrderItem } from "../../types/order";

import { getMerchant } from "../../API/ServerSideAPIs/merchants";
import { createNewOrder } from "../../API/ServerSideAPIs/orders";

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
		const { authorization } = req.headers;
		const { item } = req.body as { item: OrderItem };

		const clientId = authorization.split(":")[0];
		const clientSecret = authorization.split(":")[1];

		if (!clientId || !clientSecret) return error(403, "Invalid credentials.");
		if (!item || !item.name || !item.quantity || !item.pricePerUnit)
			return error(400, "Incomplete Information");

		const merchant = await getMerchant(clientId, clientSecret);
		if (!merchant) return error(403, "Invalid credentials");

		await createNewOrder(merchant.id, item, (err, createdOrder) => {
			if (err) return error(500, "Failed to create order.");
			else {
				createdOrder.createdAt = createdOrder.createdAt.toDate();
				createdOrder.updatedAt = createdOrder.updatedAt.toDate();
				return res.status(201).json({
					message: "Created order successfully.",
					order: createdOrder,
				});
			}
		});
	} catch (err) {
		return error(500, err.message);
	}
}
