import type { NextApiRequest, NextApiResponse } from "next";
import uuid from "uuid/dist/v4";

import query from "../../db/query";
import { CREATE_MERCHANT } from "../../queries/merchant";

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
		const {
			name,
			phoneNumber,
			email,
			description = "",
			photoURL = null,
		}: {
			name: string;
			phoneNumber: string;
			email: string;
			description?: string;
			photoURL?: string;
		} = req.body;

		const decodedToken = await verifyIDToken(authorization);

		if (!name || !email || !phoneNumber)
			return error(400, "Incomplete information");
		if (!decodedToken || !decodedToken.uid)
			return error(403, "Invalid credentials");

		const clientId = uuid();
		const clientSecret = uuid();

		const { error: merchantCreationError } = await query(CREATE_MERCHANT, [
			uuid(),
			email,
			name,
			decodedToken.uid,
			phoneNumber,
			description || "",
			photoURL || "",
			clientId,
			clientSecret,
		]);

		if (merchantCreationError)
			throw new Error("Failed to create merchant, please try again later.");

		return res.status(200).json({
			message: "Created merchant successfully.",
			clientId,
			clientSecret,
		});
	} catch (err) {
		return error(500, err.message);
	}
}
