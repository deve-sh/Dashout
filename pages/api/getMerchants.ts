import type { NextApiRequest, NextApiResponse } from "next";

import query from "../../db/query";
import { GET_USER_MERCHANTS } from "../../queries/merchant";

import verifyIDToken from "../../helpers/verifyIDToken";

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

		const decodedToken = await verifyIDToken(authorization);

		if (!decodedToken || !decodedToken.uid)
			return error(403, "Invalid credentials");

		const { error: fetchingError, results: merchants } = await query(
			GET_USER_MERCHANTS,
			[decodedToken.uid]
		);

		if (fetchingError) throw fetchingError;

		return res.status(200).json({
			message: "Fetched merchants successfully.",
			merchants: merchants.map((merchant) => {
				delete merchant.client_id;
				delete merchant.client_secret;
				return merchant;
			}),
		});
	} catch (err) {
		return error(500, err.message);
	}
}
